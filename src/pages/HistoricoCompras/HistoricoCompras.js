import React, { useEffect, useState } from "react";
import "./HistoricoCompras.css";
import { useNavigate } from "react-router-dom";
import { FiRefreshCcw } from "react-icons/fi";
import { IoTrashBin } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";

function HistoricoCompras() {
  const navigate = useNavigate();
  const [compras, setCompras] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleBackClick = () => {
    navigate("/home");
  };

  const fetchData = async () => {
    try {
      const resposta = await fetch(
        "http://localhost:3000/api/compras-com-relacionamentos",
        {
          method: "GET",
        }
      );
      const comprasData = await resposta.json();
      setCompras(comprasData);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = compras.slice(indexOfFirstItem, indexOfLastItem); // Usa 'compras' diretamente
  const totalPages = Math.ceil(compras.length / itemsPerPage); // Usa 'compras' diretamente

  return (
    <>
         <div className="containertitle">
        <div className="divtitle">
          <h1>Histórico de compras</h1>
        </div>        
      </div>
    <div className="historico-container">

      <div className="search-bar">
        <input className="search-input" type="text" placeholder="Fornecedor" />
        <input className="search-input" type="text" placeholder="Comprador" />
        <input
          className="search-input"
          type="date"
          placeholder="Data da compra"
        />
        <input
          className="search-input"
          type="date"
          placeholder="Data da emissão da invoice"
        />
        <input
          className="search-input"
          type="date"
          placeholder="Data do envio"
        />
        <input className="search-input" type="text" placeholder="Item" />
        <input
          className="search-input"
          type="text"
          placeholder="Intervalo de valor por item"
        />
        <input
          className="search-input"
          type="text"
          placeholder="Intervalo de valor por total da invoice"
        />
        <button className="filter-button">Filtrar</button>
      </div>

      <table className="historico-table">
        <thead>
          <tr className="table-header-row">
            <th className="table-header">Fornecedor</th>
            <th className="table-header">Data da Compra</th>
            <th className="table-header">Valor Total</th>
            <th className="table-header">Projeto</th>
            <th className="table-header">Gerente de Projeto</th>
            <th className="table-header">Ações</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((compra) => (
            <tr className="table-row" key={compra.id}>
              <td className="table-data">
                {compra.fornecedor
                  ? compra.fornecedor.razao_social_fornecedor
                  : "N/A"}
              </td>
              <td className="table-data">
                {compra.data_compra
                  ? new Date(compra.data_compra).toLocaleDateString()
                  : "N/A"}
              </td>
              <td className="table-data">
                R$ {compra.valor_total ? compra.valor_total.toFixed(2) : "N/A"}
              </td>
              <td className="table-data">
                {compra.projeto ? compra.projeto.nome_projeto : "N/A"}
              </td>
              <td className="table-data">
                {compra.projeto ? compra.projeto.gerente_projeto : "N/A"}
              </td>
              <td className="table-actions">
                <button className="action-button edit-button">
                  <FaEdit />
                </button>
                <button className="action-button delete-button">
                  <IoTrashBin />
                </button>
                <button className="action-button refresh-button">
                  <FiRefreshCcw />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Paginação */}
      <div className="pagination">
        <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}>
          Anterior
        </button>
        <span>
          Página {currentPage} de {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
        >
          Próxima
        </button>
      </div>

      <div className="button-container">
        <button className="cadastrar-button">Cadastrar projeto</button>
        <button className="cadastrar-button">Cadastrar fornecedor</button>
        <button
          className="back-button"
          onClick={handleBackClick}
        >
          Voltar
        </button>
      </div>
    </div>
    </>
  );
}

export default HistoricoCompras;
