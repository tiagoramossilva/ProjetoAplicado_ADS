import React from 'react';

const FornecedorSection = ({ formData, handleFormChange, buscarEndereco, showSection }) => {
  return (
    <fieldset>
      <legend>Informações do fornecedor</legend>
      <div className="form-group">
        <label>Razão Social:</label>
        <input
          type="text"
          name="fornecedor.razao_social_fornecedor"
          value={formData.fornecedor.razao_social_fornecedor || ''}
          onChange={handleFormChange}
          required
        />
        
        <label>CNPJ:</label>
        <input
          type="text"
          name="fornecedor.CNPJ"
          value={formData.fornecedor.CNPJ || ''}
          onChange={handleFormChange}
          required
        />
        
        <label>Inscrição Estadual:</label>
        <input
          type="text"
          name="fornecedor.inscricao_estadual"
          value={formData.fornecedor.inscricao_estadual || ''}
          onChange={handleFormChange}
        />
      </div>
      
      <div className="form-group">
        <label>CEP:</label>
        <input
          type="text"
          name="fornecedor.CEP"
          value={formData.fornecedor.CEP}
          onChange={handleFormChange}
          onBlur={(e) => buscarEndereco(e.target.value, 'fornecedor')}
          required
        />
        
        <label>Endereço:</label>
        <input
          type="text"
          name="fornecedor.endereco"
          value={formData.fornecedor.endereco}
          onChange={handleFormChange}
          required
        />
        
        <label>Município:</label>
        <input
          type="text"
          name="fornecedor.municipio"
          value={formData.fornecedor.municipio}
          onChange={handleFormChange}
          required
        />
        
        <label>UF:</label>
        <input
          type="text"
          name="fornecedor.UF"
          value={formData.fornecedor.UF}
          onChange={handleFormChange}
          required
        />
        
        <label>Bairro:</label>
        <input
          type="text"
          name="fornecedor.bairro"
          value={formData.fornecedor.bairro}
          onChange={handleFormChange}
        />
        
        <label>Telefone:</label>
        <input
          type="text"
          name="fornecedor.telefone"
          value={formData.fornecedor.telefone || ''}
          onChange={handleFormChange}
        />
      </div>
      
      <div className="navigation-buttons">
        <button
          type="button"
          className="next-button"
          onClick={() => showSection('cliente-section')}
        >
          Próximo
        </button>
      </div>
    </fieldset>
  );
};

export default FornecedorSection;