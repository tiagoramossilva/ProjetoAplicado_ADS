import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CadastrarArmazenamento.css';

function CadastrarArmazenamento() {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/estoque');
  };

  return (
    <div className="armazenamento-container">
      <h1 className="armazenamento-title">Cadastrar novo item</h1>

      <form className="armazenamento-form">
        <div className="form-row">
          <div className="form-group">
            <label className="form-label" htmlFor="nome">Nome:</label>
            <input className="form-input" type="text" id="nome" name="nome" />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="numeroSerie">Número de série:</label>
            <input className="form-input" type="text" id="numeroSerie" name="numeroSerie" />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="fabricante">Fabricante:</label>
            <input className="form-input" type="text" id="fabricante" name="fabricante" />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="descricaoItem">Descrição do item:</label>
          <input className="form-input" type="text" id="descricaoItem" name="descricaoItem" />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label" htmlFor="tipoUnitario">Tipo unitário:</label>
            <input className="form-input" type="text" id="tipoUnitario" name="tipoUnitario" />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="quantidade">Quantidade:</label>
            <input className="form-input" type="number" id="quantidade" name="quantidade" />
          </div>
        </div>
        <div className="button-container">
          <button className="form-button" type="submit">Salvar</button>
          <button className="form-button" type="button" onClick={handleBackClick}>Cancelar</button>
        </div>
      </form>
    </div>
  );
}

export default CadastrarArmazenamento;
