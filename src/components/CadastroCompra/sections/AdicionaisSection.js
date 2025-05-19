import React from 'react';

const AdicionaisSection = ({ formData, handleFormChange, handleSubmit, handleCancel }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  return (
    <fieldset>
      <legend>Informações Adicionais</legend>
      <div className="form-group">
        <label>Usuário:</label>
        <input
          type="text"
          name="usuario"
          value={user.nome || ''}
          onChange={handleFormChange}
          disabled
        />
        
        <label>Observações:</label>
        <textarea
          name="adicionais.observacoes"
          value={formData.adicionais.observacoes || ''}
          onChange={handleFormChange}
          rows="4"
        ></textarea>
      </div>
      
      <div className="button-group">
        <button type="submit" className="submit-button" onClick={handleSubmit}>
          Cadastrar Compra
        </button>
        <button type="button" className="cancel-button" onClick={handleCancel}>
          Cancelar
        </button>
      </div>
    </fieldset>

    
  );
};

export default AdicionaisSection;