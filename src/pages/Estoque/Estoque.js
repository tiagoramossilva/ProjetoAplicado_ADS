import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Estoque.css';
import { FiRefreshCcw } from "react-icons/fi";
import { IoTrashBin, IoSearchOutline } from "react-icons/io5";

function Estoque() {
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate('/home');
      };
    const handleCadastrarArmazenamentoClick = () => {
        navigate('/cadastrar-armazenamento');
      };

  return (
    <div className="estoque-container">
      <h1 className="estoque-title">Estoque</h1>

      <div className="search-bar">
        <input className="search-input" type="text" placeholder="Item" />
        <button className="search-button">
          <IoSearchOutline className='iconSearch' />
        </button>
        <input className="search-input" type="text" placeholder="Andar" />
        <button className="search-button">
          <IoSearchOutline  className='iconSearch' />
        </button>
        <input className="search-input" type="text" placeholder="Sala" />
        <button className="search-button">
          <IoSearchOutline  className='iconSearch' />
        </button>
        <input className="search-input" type="text" placeholder="Armário" />
        <button className="search-button">
          <IoSearchOutline  className='iconSearch' />
        </button>
        <input className="search-input" type="text" placeholder="Projeto" />
        <button className="search-button">
          <IoSearchOutline  className='iconSearch' />
        </button>
      </div>

      <table className="estoque-table">
        <thead>
          <tr className="table-header-row">
            <th className="table-header">Código</th>
            <th className="table-header">Item</th>
            <th className="table-header">Quantidade</th>
            <th className="table-header">Tipo Unitário</th>
            <th className="table-header">Andar</th>
            <th className="table-header">Sala</th>
            <th className="table-header">Armário</th>
            <th className="table-header">Projeto</th>
            <th className="table-header">Ações</th>
          </tr>
        </thead>
        <tbody>
          {[...Array(10)].map((_, index) => (
            <tr className="table-row" key={index}>
              <td className="table-data">{index + 1}</td>
              <td className="table-data">Item {index + 1}</td>
              <td className="table-data">10</td>
              <td className="table-data">Caixa</td>
              <td className="table-data">1</td>
              <td className="table-data">Sala A</td>
              <td className="table-data">Armário B</td>
              <td className="table-data">Projeto X</td>
              <td className="table-actions">
                <button className="action-button update-button">
                  <FiRefreshCcw />
                </button>
                <button className="action-button delete-button">
                  <IoTrashBin />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="button-container">
        <button className="estoque-button" onClick={handleCadastrarArmazenamentoClick} >Cadastrar local de armazenamento</button>
        <button className="estoque-button">Cadastrar Item</button>
        <button className="estoque-button"onClick={handleBackClick} >Voltar</button>
      </div>
    </div>
  );
}

export default Estoque;
