import React, { useEffect, useState } from "react";
import "./HistoricoCompras.css";
import { useNavigate } from "react-router-dom";
import { FiRefreshCcw } from "react-icons/fi";
import { IoTrashBin } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";

import Navigation from "../Navigation/Navigation";

function HistoricoCompras() {
  const navigate = useNavigate();
  const [compras, setCompras] = useState([]);
  const [filters, setFilters] = useState({
    fornecedor: "",
    comprador: "",
    dataCompra: "",
    valorMin: "",
    valorMax: "",
  });

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

  // Função para atualizar os filtros
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Função para aplicar os filtros
  const filteredData = compras.filter((compra) => {
    return (
      (!filters.fornecedor ||
        compra.fornecedor?.razao_social_fornecedor
          ?.toLowerCase()
          .includes(filters.fornecedor.toLowerCase())) &&
      (!filters.dataCompra ||
        (compra.data_compra &&
          new Date(compra.data_compra).toLocaleDateString() ===
            new Date(filters.dataCompra).toLocaleDateString())) &&
      (!filters.valorMin ||
        (compra.valor_total && compra.valor_total >= parseFloat(filters.valorMin))) &&
      (!filters.valorMax ||
        (compra.valor_total && compra.valor_total <= parseFloat(filters.valorMax)))
    );
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <>
    <Navigation />
    <div className="containertitle">
        <div className="divtitle">
          <h1>Histórico de compras</h1>
        </div>        
      </div>
    <div className="historico-container">

      <div className="search-bar">
        <input
          className="search-input"
          type="text"
          name="fornecedor"
          placeholder="Fornecedor"
          value={filters.fornecedor}
          onChange={handleFilterChange}
        />
        <input
          className="search-input"
          type="date"
          name="dataCompra"
          placeholder="Data da compra"
          value={filters.dataCompra}
          onChange={handleFilterChange}
        />
        <input
          className="search-input"
          type="text"
          name="valorMin"
          placeholder="Valor mínimo"
          value={filters.valorMin}
          onChange={handleFilterChange}
        />
        <input
          className="search-input"
          type="text"
          name="valorMax"
          placeholder="Valor máximo"
          value={filters.valorMax}
          onChange={handleFilterChange}
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
        <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} className="buttonsPagination">
          Anterior
        </button>
        <span>
          Página {currentPage} de {totalPages}
        </span>
        <button className="buttonsPagination"
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
        >
          Próxima
        </button>
      </div>

      <div className="button-containerHistorico">
        <button className="historico-button">Cadastrar projeto</button>
        <button className="historico-button">Cadastrar fornecedor</button>
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
