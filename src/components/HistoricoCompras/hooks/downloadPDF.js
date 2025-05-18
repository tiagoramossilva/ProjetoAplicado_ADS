import jsPDF from "jspdf";

const downloadPDF = async (notaUrl) => {
  try {
    const response = await fetch(notaUrl);
    const xmlText = await response.text();

    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, "text/xml");

    const emitente = xmlDoc.querySelector("emit");
    const enderEmit = emitente ? emitente.querySelector("enderEmit") : null;
    const destinatario = xmlDoc.querySelector("dest");
    const ide = xmlDoc.querySelector("ide");
    const produtos = Array.from(xmlDoc.querySelectorAll("det"));

    if (!emitente || !enderEmit || !destinatario || !ide) {
      alert("Erro ao processar a nota. Dados incompletos.");
      return;
    }

    // Preparando dados
    const invoiceData = {
      fornecedor: {
        razao_social_fornecedor:
          emitente.querySelector("xNome")?.textContent || "",
        CNPJ: emitente.querySelector("CNPJ")?.textContent || "",
        inscricao_estadual: emitente.querySelector("IE")?.textContent || "",
        endereco: `${enderEmit.querySelector("xLgr")?.textContent || ""}, ${
          enderEmit.querySelector("nro")?.textContent || ""
        }`,
        bairro: enderEmit.querySelector("xBairro")?.textContent || "",
        municipio: enderEmit.querySelector("xMun")?.textContent || "",
        UF: enderEmit.querySelector("UF")?.textContent || "",
        CEP: enderEmit.querySelector("CEP")?.textContent || "",
        telefone: enderEmit.querySelector("fone")?.textContent || "",
      },
      cliente: {
        razao_social_cliente:
          destinatario.querySelector("xNome")?.textContent || "",
        CNPJ:
          destinatario.querySelector("CPF")?.textContent ||
          destinatario.querySelector("CNPJ")?.textContent ||
          "",
        inscricao_estadual: destinatario.querySelector("IE")?.textContent || "",
        endereco: destinatario.querySelector("xLgr")?.textContent || "",
        bairro: destinatario.querySelector("xBairro")?.textContent || "",
        CEP: destinatario.querySelector("CEP")?.textContent || "",
        municipio: destinatario.querySelector("xMun")?.textContent || "",
        UF: destinatario.querySelector("UF")?.textContent || "",
        telefone: destinatario.querySelector("fone")?.textContent || "",
      },
      compra: {
        data_emissao: ide.querySelector("dhEmi")?.textContent || "",
        valor_total: xmlDoc.querySelector("vNF")?.textContent || "",
        data_envio: ide.querySelector("dhSaiEnt")?.textContent || "",
        xml_url: notaUrl || "",
      },
      produtos: produtos.map((prod) => ({
        nome: prod.querySelector("xProd")?.textContent || "",
        numero_serie: prod.querySelector("cProd")?.textContent || "",
        tipo_unitario: prod.querySelector("uCom")?.textContent || "",
        quantidade: prod.querySelector("qCom")?.textContent || "",
      })),
    };

    // Criar PDF
    const doc = new jsPDF();

    let y = 10;

    doc.setFontSize(16);
    doc.text("DANFE Simplificada", 105, y, { align: "center" });
    y += 10;

    doc.setFontSize(12);
    doc.text("Emitente:", 10, y);
    y += 7;
    doc.text(
      `Razão Social: ${invoiceData.fornecedor.razao_social_fornecedor}`,
      10,
      y
    );
    y += 7;
    doc.text(`CNPJ: ${invoiceData.fornecedor.CNPJ}`, 10, y);
    y += 7;
    doc.text(`IE: ${invoiceData.fornecedor.inscricao_estadual}`, 10, y);
    y += 7;
    doc.text(
      `Endereço: ${invoiceData.fornecedor.endereco}, ${invoiceData.fornecedor.bairro} - ${invoiceData.fornecedor.municipio}/${invoiceData.fornecedor.UF}, CEP: ${invoiceData.fornecedor.CEP}`,
      10,
      y,
      { maxWidth: 190 }
    );
    y += 10;

    doc.text("Destinatário:", 10, y);
    y += 7;
    doc.text(
      `Razão Social: ${invoiceData.cliente.razao_social_cliente}`,
      10,
      y
    );
    y += 7;
    doc.text(`CNPJ/CPF: ${invoiceData.cliente.CNPJ}`, 10, y);
    y += 7;
    doc.text(`IE: ${invoiceData.cliente.inscricao_estadual}`, 10, y);
    y += 7;
    doc.text(
      `Endereço: ${invoiceData.cliente.endereco}, ${invoiceData.cliente.bairro} - ${invoiceData.cliente.municipio}/${invoiceData.cliente.UF}, CEP: ${invoiceData.cliente.CEP}`,
      10,
      y,
      { maxWidth: 190 }
    );
    y += 10;

    doc.text("Informações da Compra:", 10, y);
    y += 7;
    doc.text(
      `Data de Emissão: ${new Date(
        invoiceData.compra.data_emissao
      ).toLocaleString()}`,
      10,
      y
    );
    y += 7;
    doc.text(
      `Data de Envio: ${new Date(
        invoiceData.compra.data_envio
      ).toLocaleString()}`,
      10,
      y
    );
    y += 7;
    doc.text(`Valor Total: R$ ${invoiceData.compra.valor_total}`, 10, y);
    y += 10;

    // Tabela simples dos produtos
    doc.text("Produtos:", 10, y);
    y += 7;

    // Cabeçalho
    doc.setFont(undefined, "bold");
    doc.text("Produto", 10, y);
    doc.text("Código", 120, y);
    doc.text("Qtd", 160, y);
    doc.text("Tipo", 170, y);
    doc.setFont(undefined, "normal");
    y += 6;

    invoiceData.produtos.forEach((p) => {
      if (y > 280) {
        doc.addPage();
        y = 10;
      }
      doc.text(p.nome, 10, y);
      doc.text(p.numero_serie, 120, y);
      doc.text(p.quantidade.toString(), 160, y);
      doc.text(p.tipo_unitario, 170, y);
      y += 7;
    });

    doc.save("nota-fiscal.pdf");
  } catch (error) {
    console.error("Erro ao gerar o PDF:", error);
    alert("Ocorreu um erro ao gerar o PDF.");
  }
};

export default downloadPDF;
