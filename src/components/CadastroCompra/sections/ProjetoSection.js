import React from 'react';

const ProjetoSection = ({ 
  formData, 
  projetos, 
  novoProjeto, 
  handleFormChange, 
  handleProjetoChange, 
  showSection 
}) => {
  return (
    <fieldset>
      <legend>Informações do projeto</legend>
      <div className="form-group">
        <label>Nome do Projeto:</label>
        <select
          name="projeto.nome_projeto"
          value={formData.projeto.nome_projeto || ''}
          onChange={handleProjetoChange}
          required
        >
          <option value="">Selecione um projeto</option>
          {projetos.map((projeto) => (
            <option key={projeto.id} value={projeto.nome_projeto}>
              {projeto.nome_projeto}
            </option>
          ))}
          <option value="novo">Outro (Adicionar Novo)</option>
        </select>
        
        {novoProjeto && (
          <input
            type="text"
            name="projeto.nome_projeto"
            placeholder="Digite o nome do novo projeto"
            value={formData.projeto.nome_projeto || ''}
            onChange={handleFormChange}
            required
          />
        )}
        
        <label>Responsável Técnico:</label>
        <input
          type="text"
          name="projeto.responsavel_tecnico"
          value={formData.projeto.responsavel_tecnico || ''}
          onChange={handleFormChange}
          required
        />
        
        <label>Gerente do Projeto:</label>
        <input
          type="text"
          name="projeto.gerente_projeto"
          value={formData.projeto.gerente_projeto || ''}
          onChange={handleFormChange}
          required
        />
      </div>
      
      <div className="navigation-buttons">
        <button
          type="button"
          className="prev-button"
          onClick={() => showSection('produtos-section')}
        >
          Anterior
        </button>
        <button
          type="button"
          className="next-button"
          onClick={() => showSection('adicionais-section')}
        >
          Próximo
        </button>
      </div>
    </fieldset>
  );
};

export default ProjetoSection;