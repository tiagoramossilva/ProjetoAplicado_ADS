import jsPDF from "jspdf";

const downloadPDF = async (notaUrl) => {
  try {
    console.log("[1/4] Iniciando download do XML...");
    const response = await fetch(notaUrl);
    if (!response.ok) throw new Error(`Erro ao baixar XML: ${response.status}`);
    const xmlText = await response.text();
    console.log("[1/4] XML baixado com sucesso!");

    console.log("[2/4] Verificando estrutura do XML...");
    const { isValidaNFe, isPadraoDanfe } = await verificarNFe(xmlText);
    console.log(
      `[2/4] Resultado: Válida? ${isValidaNFe} | Padrão DANFE? ${isPadraoDanfe}`
    );

    if (isValidaNFe && isPadraoDanfe) {
      console.log("[3/4] Tentando gerar DANFE online...");
      try {
        await gerarDanfeOnline(xmlText);
        console.log("[3/4] DANFE gerado com sucesso via serviço online!");
        return;
      } catch (onlineError) {
        console.warn("[3/4] Falha no DANFE Online:", onlineError.message);
        console.log("[3/4] Continuando com geração manual...");
      }
    }

    console.log("[4/4] Gerando PDF manualmente...");
    await gerarPdfManual(xmlText, notaUrl);
    console.log("[4/4] PDF manual gerado com sucesso!");
  } catch (error) {
    console.error("[ERRO] Processo falhou:", error);
    gerarPdfErro(error.message, notaUrl);
  }
};

// Função para verificar o XML (VERSÃO CORRIGIDA)
async function verificarNFe(xmlText) {
  try {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, "text/xml");

    // Verifica erros de parsing
    if (xmlDoc.querySelector("parsererror")) {
      console.error("XML malformado ou inválido");
      return { isValidaNFe: false, isPadraoDanfe: false };
    }

    // Verifica tags essenciais
    const hasNFe = !!xmlDoc.querySelector("NFe, NFe");
    const hasInfNFe = !!xmlDoc.querySelector("infNFe");
    const hasEmitente = !!xmlDoc.querySelector("emit");

    // Verifica versão da NFe (corrigido para verificar o atributo versao da tag infNFe)
    const versaoNFe =
      xmlDoc.querySelector("infNFe")?.getAttribute("versao") || "";
    const isPadraoDanfe = versaoNFe === "4.00" || versaoNFe === "3.10";

    return {
      isValidaNFe: hasNFe && hasInfNFe && hasEmitente,
      isPadraoDanfe,
    };
  } catch (e) {
    console.error("Erro na análise do XML:", e);
    return { isValidaNFe: false, isPadraoDanfe: false };
  }
}

// Restante do código permanece igual...

// Função para gerar DANFE online
async function gerarDanfeOnline(xmlText) {
  try {
    console.log("Enviando XML para o serviço DANFE Online...");
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000); // 15s timeout

    const response = await fetch("https://danfeonline.com.br/api/v1/danfe", {
      method: "POST",
      headers: {
        "Content-Type": "application/xml",
        Accept: "application/pdf",
      },
      body: xmlText,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Servidor retornou erro ${response.status}: ${errorText}`
      );
    }

    const contentType = response.headers.get("content-type");
    if (!contentType?.includes("application/pdf")) {
      throw new Error("Resposta não é um PDF válido");
    }

    const pdfBlob = await response.blob();
    const pdfUrl = URL.createObjectURL(pdfBlob);

    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = `DANFE_${new Date().getTime()}.pdf`;
    document.body.appendChild(link);
    link.click();

    setTimeout(() => {
      document.body.removeChild(link);
      URL.revokeObjectURL(pdfUrl);
    }, 100);
  } catch (error) {
    console.error("Erro detalhado na geração online:", error);
    throw new Error(`Falha ao gerar DANFE online: ${error.message}`);
  }
}

// Função para gerar PDF manual
async function gerarPdfManual(xmlText, notaUrl) {
  try {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, "text/xml");

    // Função auxiliar para extrair dados
    const getText = (el, selector) =>
      el?.querySelector(selector)?.textContent?.trim() || "Não informado";

    // Extrai dados principais
    const emitente = xmlDoc.querySelector("emit");
    const destinatario = xmlDoc.querySelector("dest");
    const ide = xmlDoc.querySelector("ide");

    if (!emitente || !destinatario || !ide) {
      throw new Error("Estrutura do XML incompleta - faltam tags essenciais");
    }

    // Organiza os dados
    const dados = {
      emitente: {
        nome: getText(emitente, "xNome"),
        cnpj: getText(emitente, "CNPJ"),
        ie: getText(emitente, "IE"),
        endereco: `${getText(emitente, "enderEmit > xLgr")}, ${getText(
          emitente,
          "enderEmit > nro"
        )}`,
        cidade: `${getText(emitente, "enderEmit > xMun")}/${getText(
          emitente,
          "enderEmit > UF"
        )}`,
        cep: formatarCEP(getText(emitente, "enderEmit > CEP")),
      },
      destinatario: {
        nome: getText(destinatario, "xNome"),
        documento: getText(destinatario, "CNPJ, CPF"),
        ie: getText(destinatario, "IE"),
        endereco: `${getText(destinatario, "enderDest > xLgr")}, ${getText(
          destinatario,
          "enderDest > nro"
        )}`,
        cidade: `${getText(destinatario, "enderDest > xMun")}/${getText(
          destinatario,
          "enderDest > UF"
        )}`,
      },
      nota: {
        numero: getText(ide, "nNF"),
        serie: getText(ide, "serie"),
        emissao: formatarData(getText(ide, "dhEmi")),
        valor: formatarMoeda(getText(xmlDoc, "vNF")),
      },
      produtos: Array.from(xmlDoc.querySelectorAll("det")).map((prod) => ({
        descricao: getText(prod, "xProd"),
        codigo: getText(prod, "cProd"),
        quantidade: formatarNumero(getText(prod, "qCom")),
        unidade: getText(prod, "uCom"),
        valor: formatarMoeda(getText(prod, "vUnCom")),
      })),
    };

    // Cria o PDF
    const doc = new jsPDF();

    // Configurações iniciais
    const marginLeft = 14;
    let yPosition = 15;

    // Cabeçalho
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("DANFE SIMPLIFICADA", 105, yPosition, { align: "center" });
    yPosition += 10;

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(
      `Nº ${dados.nota.numero} • Série ${dados.nota.serie}`,
      105,
      yPosition,
      { align: "center" }
    );
    yPosition += 15;

    // Emitente
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("EMITENTE", marginLeft, yPosition);
    yPosition += 7;

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`Nome: ${dados.emitente.nome}`, marginLeft, yPosition);
    yPosition += 7;

    doc.text(
      `CNPJ: ${formatarCNPJ(dados.emitente.cnpj)} • IE: ${dados.emitente.ie}`,
      marginLeft,
      yPosition
    );
    yPosition += 7;

    doc.text(`Endereço: ${dados.emitente.endereco}`, marginLeft, yPosition);
    yPosition += 7;

    doc.text(
      `Cidade: ${dados.emitente.cidade} • CEP: ${dados.emitente.cep}`,
      marginLeft,
      yPosition
    );
    yPosition += 15;

    // Destinatário
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("DESTINATÁRIO", marginLeft, yPosition);
    yPosition += 7;

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`Nome: ${dados.destinatario.nome}`, marginLeft, yPosition);
    yPosition += 7;

    doc.text(
      `Documento: ${formatarDocumento(dados.destinatario.documento)} • IE: ${
        dados.destinatario.ie
      }`,
      marginLeft,
      yPosition
    );
    yPosition += 7;

    doc.text(`Endereço: ${dados.destinatario.endereco}`, marginLeft, yPosition);
    yPosition += 7;

    doc.text(`Cidade: ${dados.destinatario.cidade}`, marginLeft, yPosition);
    yPosition += 15;

    // Informações da Nota
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("INFORMAÇÕES DA NOTA", marginLeft, yPosition);
    yPosition += 7;

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`Data de Emissão: ${dados.nota.emissao}`, marginLeft, yPosition);
    yPosition += 7;

    doc.text(`Valor Total: R$ ${dados.nota.valor}`, marginLeft, yPosition);
    yPosition += 15;

    // Produtos
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("PRODUTOS/SERVIÇOS", marginLeft, yPosition);
    yPosition += 10;

    // Cabeçalho da tabela
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("Descrição", marginLeft, yPosition);
    doc.text("Código", marginLeft + 60, yPosition);
    doc.text("Qtd", marginLeft + 100, yPosition);
    doc.text("Un", marginLeft + 120, yPosition);
    doc.text("Valor Unit.", marginLeft + 140, yPosition);
    yPosition += 6;

    // Linhas dos produtos
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);

    dados.produtos.forEach((prod) => {
      if (yPosition > 270) {
        doc.addPage();
        yPosition = 20;
      }

      doc.text(prod.descricao.substring(0, 30), marginLeft, yPosition);
      doc.text(prod.codigo, marginLeft + 60, yPosition);
      doc.text(prod.quantidade, marginLeft + 100, yPosition);
      doc.text(prod.unidade, marginLeft + 120, yPosition);
      doc.text(prod.valor, marginLeft + 140, yPosition);
      yPosition += 7;
    });

    // Rodapé
    yPosition = doc.internal.pageSize.height - 20;
    doc.setFontSize(8);
    doc.text(
      `Documento gerado em: ${new Date().toLocaleString("pt-BR")}`,
      14,
      yPosition
    );
    doc.text(`XML: ${notaUrl}`, 14, yPosition + 6);

    // Salva o PDF
    doc.save(`DANFE_${dados.nota.numero}.pdf`);
  } catch (error) {
    console.error("Erro na geração manual:", error);
    throw new Error("Falha ao gerar PDF manual: " + error.message);
  }
}

// Funções auxiliares de formatação
function formatarData(dataString) {
  try {
    if (!dataString) return "Não informado";
    const date = new Date(dataString);
    return date.toLocaleString("pt-BR");
  } catch {
    return dataString || "Não informado";
  }
}

function formatarMoeda(valor) {
  try {
    const num = parseFloat(valor);
    return isNaN(num)
      ? "0,00"
      : num.toLocaleString("pt-BR", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
  } catch {
    return valor || "0,00";
  }
}

function formatarNumero(valor) {
  try {
    const num = parseFloat(valor);
    return isNaN(num) ? "0" : num.toLocaleString("pt-BR");
  } catch {
    return valor || "0";
  }
}

function formatarCEP(cep) {
  if (!cep) return "Não informado";
  if (cep.length === 8) {
    return `${cep.substring(0, 2)}.${cep.substring(2, 5)}-${cep.substring(5)}`;
  }
  return cep;
}

function formatarCNPJ(cnpj) {
  if (!cnpj) return "Não informado";
  if (cnpj.length === 14) {
    return `${cnpj.substring(0, 2)}.${cnpj.substring(2, 5)}.${cnpj.substring(
      5,
      8
    )}/${cnpj.substring(8, 12)}-${cnpj.substring(12)}`;
  }
  return cnpj;
}

function formatarDocumento(doc) {
  if (!doc) return "Não informado";
  if (doc.length === 11) {
    // CPF
    return `${doc.substring(0, 3)}.${doc.substring(3, 6)}.${doc.substring(
      6,
      9
    )}-${doc.substring(9)}`;
  } else if (doc.length === 14) {
    // CNPJ
    return formatarCNPJ(doc);
  }
  return doc;
}

// Função para gerar PDF de erro
function gerarPdfErro(mensagemErro, notaUrl) {
  const doc = new jsPDF();

  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("ERRO AO PROCESSAR NOTA FISCAL", 105, 20, { align: "center" });

  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text(`Ocorreu um erro ao processar a nota fiscal:`, 20, 40);

  doc.setFont("helvetica", "bold");
  doc.text(mensagemErro, 20, 50, { maxWidth: 170 });

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(`URL da nota: ${notaUrl}`, 20, 70);
  doc.text(`Data/hora: ${new Date().toLocaleString("pt-BR")}`, 20, 80);
  doc.text("Verifique o console do navegador para detalhes técnicos.", 20, 90);

  doc.save("ERRO_PROCESSAMENTO_NOTA.pdf");
}

export default downloadPDF;
