import React, { useState } from "react";
import "./HistoricoCompras.css";
import { useNavigate } from "react-router-dom";
import { FiRefreshCcw } from "react-icons/fi";
import { IoTrashBin } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";

function HistoricoCompras() {
  const navigate = useNavigate();

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

  return (
    <>
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
          <button
            className="filter-button"
            onClick={() => setData(filteredData)}
          >
            Filtrar
          </button>
        </div>

        <table className="historico-table">
          <thead>
            <tr className="table-header-row">
              <th className="table-header">Código</th>
              <th className="table-header">Fornecedor</th>
              <th className="table-header">Data da Compra</th>
              <th className="table-header">Valor Total</th>
              <th className="table-header">Projeto</th>
              <th className="table-header">Gerente de Projeto</th>
              <th className="table-header">Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row) => (
              <tr className="table-row" key={row.codigo}>
                <td className="table-data">{row.codigo}</td>
                <td className="table-data">{row.fornecedor}</td>
                <td className="table-data">{row.dataCompra}</td>
                <td className="table-data">R$ {row.valorTotal}</td>
                <td className="table-data">{row.projeto}</td>
                <td className="table-data">{row.gp}</td>
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

        <div className="button-container">
          <button className="cadastrar-button">Cadastrar projeto</button>
          <button className="cadastrar-button">Cadastrar fornecedor</button>
          <button className="back-button" onClick={handleBackClick}>
            Voltar
          </button>
        </div>
      </div>
    </>
  );
}

export default HistoricoCompras;
