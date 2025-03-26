import React, { useState } from "react";
import { FaUpload, FaBox, FaHistory, FaCog } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
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

  const handleUploadInvoice = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const parser = new DOMParser();
      const xml = parser.parseFromString(e.target.result, "text/xml");

      const getText = (tag) => {
        const elements = xml.getElementsByTagName(tag);
        return elements.length > 0 ? elements[0].textContent : "";
      };

      // Extração dos dados do fornecedor
      const fornecedorNome = getText("xNome");
      const fornecedorCNPJ = getText("CNPJ");
      const fornecedorIE = getText("IE");
      const fornecedorEndereco = getText("xLgr");
      const fornecedorNumero = getText("nro");
      const fornecedorBairro = getText("xBairro");
      const fornecedorCidade = getText("xMun");
      const fornecedorUF = getText("UF");
      const fornecedorCEP = getText("CEP");
      const fornecedorTelefone = getText("fone");

      // Extração dos dados do cliente
      const clienteNome = getText("xNome");
      const clienteCPF = getText("CPF");
      const clienteEmail = getText("email");

      // Extração dos dados da compra
      const numeroNota = getText("nNF");
      const serieNota = getText("serie");
      const dataEmissao = getText("dhEmi");
      const valorTotal = getText("vNF");

      // Extração dos produtos
      const produtosNodes = xml.getElementsByTagName("det");
      const produtos = Array.from(produtosNodes).map((item) => ({
        nome: getTextFromNode(item, "xProd"),
        numero_serie: getTextFromNode(item, "cProd"),
        fabricante: fornecedorNome,
        descricao: "",
        tipo_unitario: getTextFromNode(item, "uCom"),
        quantidade: parseFloat(getTextFromNode(item, "qCom")) || 1,
        andar: "",
        sala: "",
        armario: "",
      }));

      // Armazenar os dados no localStorage para acessá-los na outra página
      localStorage.setItem(
        "invoiceData",
        JSON.stringify({
          fornecedor: {
            razao_social_fornecedor: fornecedorNome,
            CNPJ: fornecedorCNPJ,
            inscricao_estadual: fornecedorIE,
            endereco: `${fornecedorEndereco}, ${fornecedorNumero}`,
            bairro: fornecedorBairro,
            municipio: fornecedorCidade,
            UF: fornecedorUF,
            CEP: fornecedorCEP,
            telefone: fornecedorTelefone,
          },
          cliente: {
            razao_social_cliente: clienteNome,
            CPF: clienteCPF,
            email: clienteEmail,
          },
          compra: {
            data_emissao: dataEmissao,
            numero_nota: numeroNota,
            serie: serieNota,
            valor_total: valorTotal,
          },
          produtos: produtos,
        })
      );

      // Redireciona para a página de Cadastro de Compra
      navigate("/cadastro-compra");
      setShowInvoiceDropdown(false);
    };

    reader.readAsText(file);
  };

  // Função auxiliar para acessar nós dentro dos produtos corretamente
  const getTextFromNode = (node, tag) => {
    const elements = node.getElementsByTagName(tag);
    return elements.length > 0 ? elements[0].textContent : "";
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
            <div className="dropdown-menu">
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
              <label htmlFor="uploadXML">Fazer Upload da Invoice</label>
              <input
                id="uploadXML"
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
