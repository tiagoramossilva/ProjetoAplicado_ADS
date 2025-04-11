import React from 'react';

const CompraSection = ({ formData, handleFormChange, formatDateForInput, showSection }) => {
  return (
    <fieldset>
      <legend>Informações da compra</legend>
      <div className="form-group">
        <label>Data da Compra:</label>
        <input
          type="date"
          name="compra.data_compra"
          value={formatDateForInput(formData.compra.data_compra)}
          onChange={handleFormChange}
          required
        />
        
        <label>Data de Emissão:</label>
        <input
          type="date"
          name="compra.data_emissao"
          value={formatDateForInput(formData.compra.data_emissao)}
          onChange={handleFormChange}
          required
        />
        
        <label>Data de Envio:</label>
        <input
          type="date"
          name="compra.data_envio"
          value={formatDateForInput(formData.compra.data_envio)}
          onChange={handleFormChange}
        />
        
        <label>Valor Total:</label>
        <input
          type="number"
          name="compra.valor_total"
          value={formData.compra.valor_total || ''}
          onChange={handleFormChange}
          step="0.01"
          min="0"
          required
        />
      </div>
      
      <div className="navigation-buttons">
        <button
          type="button"
          className="prev-button"
          onClick={() => showSection('cliente-section')}
        >
          Anterior
        </button>
        <button
          type="button"
          className="next-button"
          onClick={() => showSection('produtos-section')}
        >
          Próximo
        </button>
      </div>
    </fieldset>
  );
};

export default CompraSection;