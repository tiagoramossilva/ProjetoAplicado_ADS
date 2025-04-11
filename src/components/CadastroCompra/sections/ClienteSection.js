import React from 'react';

const ClienteSection = ({ formData, handleFormChange, buscarEndereco, showSection }) => {
  return (
    <fieldset>
      <legend>Informações do cliente</legend>
      <div className="form-group">
        <label>Razão Social:</label>
        <input
          type="text"
          name="cliente.razao_social_cliente"
          value={formData.cliente.razao_social_cliente || ''}
          onChange={handleFormChange}
          required
        />
        
        <label>CNPJ:</label>
        <input
          type="text"
          name="cliente.CNPJ"
          value={formData.cliente.CNPJ || ''}
          onChange={handleFormChange}
          required
        />
        
        <label>Inscrição Estadual:</label>
        <input
          type="text"
          name="cliente.inscricao_estadual"
          value={formData.cliente.inscricao_estadual || ''}
          onChange={handleFormChange}
        />
      </div>
      
      <div className="form-group">
        <label>CEP:</label>
        <input
          type="text"
          name="cliente.CEP"
          value={formData.cliente.CEP}
          onChange={handleFormChange}
          onBlur={(e) => buscarEndereco(e.target.value, 'cliente')}
          required
        />
        
        <label>Endereço:</label>
        <input
          type="text"
          name="cliente.endereco"
          value={formData.cliente.endereco}
          onChange={handleFormChange}
          required
        />
        
        <label>Município:</label>
        <input
          type="text"
          name="cliente.municipio"
          value={formData.cliente.municipio}
          onChange={handleFormChange}
          required
        />
        
        <label>UF:</label>
        <input
          type="text"
          name="cliente.UF"
          value={formData.cliente.UF}
          onChange={handleFormChange}
          required
        />
        
        <label>Bairro:</label>
        <input
          type="text"
          name="cliente.bairro"
          value={formData.cliente.bairro}
          onChange={handleFormChange}
        />
        
        <label>Telefone:</label>
        <input
          type="text"
          name="cliente.telefone"
          value={formData.cliente.telefone || ''}
          onChange={handleFormChange}
        />
      </div>
      
      <div className="navigation-buttons">
        <button
          type="button"
          className="prev-button"
          onClick={() => showSection('fornecedor-section')}
        >
          Anterior
        </button>
        <button
          type="button"
          className="next-button"
          onClick={() => showSection('compra-section')}
        >
          Próximo
        </button>
      </div>
    </fieldset>
  );
};

export default ClienteSection;