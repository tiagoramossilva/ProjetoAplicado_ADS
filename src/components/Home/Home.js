import React, { useState } from "react";
import { FaUpload, FaBox, FaHistory, FaCog } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient.js";
import "./Home.css";

function Home() {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showInvoiceDropdown, setShowInvoiceDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleUploadClick = () => {
    setShowInvoiceDropdown(!showInvoiceDropdown);
  };

  const handleStockClick = () => {
    navigate("/estoque");
  };

  const handleHistoricoClick = () => {
    navigate("/historico-compras");
  };

  const handleConfigClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleUserClick = () => {
    navigate("/usuarios");
  };

  const handleLogoutClick = () => {
    setShowModal(true);
  };

  const confirmLogout = () => {
    setShowModal(false);
    navigate("/");
  };

  const cancelLogout = () => {
    setShowModal(false);
  };

  const handleUploadInvoice = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const fileName = `${Date.now()}-${file.name}`;
    const { error } = await supabase.storage
      .from("stockmaster")
      .upload(fileName, file, { upsert: true });
      console.log(error)
    if (error) {
      alert("Erro ao fazer upload da nota.");
      console.error(error);
      return;
    }

    // Pega a URL pública (ou use `getPublicUrl` se for bucket público)
    const { data: publicUrlData } = supabase.storage
      .from("stockmaster")
      .getPublicUrl(fileName);

    const notaUrl = publicUrlData.publicUrl;

    const reader = new FileReader();
    reader.onload = (e) => {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(e.target.result, "text/xml");

      // Verifica se o XML contém as informações esperadas
      const emitente = xmlDoc.querySelector("emit");
      const enderEmit = emitente ? emitente.querySelector("enderEmit") : null;
      const destinatario = xmlDoc.querySelector("dest");
      const ide = xmlDoc.querySelector("ide");
      const produtos = Array.from(xmlDoc.querySelectorAll("det"));

      if (!emitente || !enderEmit || !destinatario || !ide) {
        alert("Erro ao processar a invoice. Dados incompletos.");
        return;
      }

      // Extrai os dados do XML de forma mais robusta
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
          inscricao_estadual:
            destinatario.querySelector("IE")?.textContent || "",
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
          data_compra: ide.querySelector("dhEmi")?.textContent || "",
          data_envio: ide.querySelector("dhEmi")?.textContent || "",
          xml_url: notaUrl || "",
        },
        produtos: produtos.map((prod) => ({
          nome: prod.querySelector("xProd")?.textContent || "",
          numero_serie: prod.querySelector("cProd")?.textContent || "",
          fabricante: emitente.querySelector("xNome")?.textContent || "",
          descricao: "",
          tipo_unitario: prod.querySelector("uCom")?.textContent || "",
          quantidade: prod.querySelector("qCom")?.textContent || "",
          andar: "",
          sala: "",
          armario: "",
        })),
      };

      console.log("Dados que serão salvos:", invoiceData);

      // Salva no localStorage
      localStorage.setItem("invoiceData", JSON.stringify(invoiceData));
      navigate("/cadastro-compra");
    };
    reader.readAsText(file);
  };

  const handleInsertManually = () => {
    setShowInvoiceDropdown(false);
    navigate("/cadastro-compra");
  };

  return (
    <>
      <div className="containerhomeconfig">
        <div className="config-button">
          <div className="icon-container upload-icon">
            <FaCog onClick={handleConfigClick} />
          </div>
          {showDropdown && (
            <div className="dropdown-menu-config">
              <p onClick={handleUserClick}>Usuários</p>
              <p onClick={handleLogoutClick}>Sair</p>
            </div>
          )}
        </div>
      </div>

      <div className="home-container">
        <div className="card" onClick={handleUploadClick}>
          <div className="icon-container upload-icon">
            <FaUpload className="iconUpload" />
          </div>
          <p className="card-title">Upload de Invoices</p>
        </div>

        {showInvoiceDropdown && (
          <div className="dropdown-menu">
            <p onClick={handleInsertManually}>Inserir Manualmente</p>
            <p>
              <label htmlFor="arquivoXml">Fazer Upload da Invoice</label>
              <input
                id="arquivoXml"
                type="file"
                accept=".xml"
                style={{ display: "none" }}
                onChange={handleUploadInvoice}
              />
            </p>
          </div>
        )}

        <div className="card" onClick={handleStockClick}>
          <div className="icon-container stock-icon">
            <FaBox className="iconUpload" />
          </div>
          <p className="card-title">Controle de estoques</p>
        </div>

        <div className="card" onClick={handleHistoricoClick}>
          <div className="icon-container history-icon">
            <FaHistory className="iconUpload" />
          </div>
          <p className="card-title">Histórico de compras</p>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <p>Tem certeza que deseja sair?</p>
            <div className="modal-buttons">
              <button onClick={confirmLogout}>Sim</button>
              <button onClick={cancelLogout}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
