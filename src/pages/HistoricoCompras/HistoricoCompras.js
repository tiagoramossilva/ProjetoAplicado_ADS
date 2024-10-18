import React from 'react';
import './HistoricoCompras.css';
import { useNavigate } from 'react-router-dom';
import { FiRefreshCcw } from "react-icons/fi";
import { IoTrashBin} from "react-icons/io5";
import { FaEdit } from "react-icons/fa";

function HistoricoCompras() {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/home');
  };

  return (
    <div className="historico-container">
      <h1 className="historico-title">Histórico de compras</h1>

      <div className="search-bar">
        <input className="search-input" type="text" placeholder="Fornecedor" />
        <input className="search-input" type="text" placeholder="Comprador" />
        <input className="search-input" type="date" placeholder="Data da compra" />
        <input className="search-input" type="date" placeholder="Data da emissão da invoice" />
        <input className="search-input" type="date" placeholder="Data do envio" />
        <input className="search-input" type="text" placeholder="Item" />
        <input className="search-input" type="text" placeholder="Intervalo de valor por item" />
        <input className="search-input" type="text" placeholder="Intervalo de valor por total da invoice" />
        <button className="filter-button">Filtrar</button>
      </div>

      <table className="historico-table">
        <thead>
          <tr className="table-header-row">
            <th className="table-header">Código</th>
            <th className="table-header">Fornecedor</th>
            <th className="table-header">Data da Compra</th>
            <th className="table-header">Valor Total</th>
            <th className="table-header">Projeto</th>
            <th className="table-header">GP</th>
            <th className="table-header">Ações</th>
          </tr>
        </thead>
        <tbody>
          {[...Array(10)].map((_, index) => (
            <tr className="table-row" key={index}>
              <td className="table-data">{index + 1}</td>
              <td className="table-data">Fornecedor {index + 1}</td>
              <td className="table-data">01/10/2024</td>
              <td className="table-data">R$ 1000</td>
              <td className="table-data">Projeto {index + 1}</td>
              <td className="table-data">GP {index + 1}</td>
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
        <button className="historico-button">Cadastrar projeto</button>
        <button className="historico-button">Cadastrar fornecedor</button>
        <button className="historico-button voltar-button"onClick={handleBackClick} >Voltar</button>
      </div>
    </div>
  );
}

export default HistoricoCompras;
