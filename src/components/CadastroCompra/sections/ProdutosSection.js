import React from "react";

const ProdutosSection = ({
  produtos,
  handleChange,
  handleAddProduct,
  handleRemoveProduct,
  showSection,
}) => {
  return (
    <fieldset>
      <legend>Produtos</legend>

      {produtos.map((produto, index) => (
        <div key={index} className="product-item">
          <div className="form-group">
            <label>Nome:</label>
            <input
              type="text"
              name="nome"
              value={produto.nome}
              onChange={(e) => handleChange(index, e)}
              required
            />

            <label>Número de Série:</label>
            <input
              type="number"
              name="numero_serie"
              value={produto.numero_serie || ""}
              onChange={(e) => handleChange(index, e)}
              required
            />

            <label>Fabricante:</label>
            <input
              type="text"
              name="fabricante"
              value={produto.fabricante}
              onChange={(e) => handleChange(index, e)}
            />

            <label>Descrição:</label>
            <input
              type="text"
              name="descricao"
              value={produto.descricao}
              onChange={(e) => handleChange(index, e)}
            />

            <label>Tipo Unitário:</label>
            <input
              type="text"
              name="tipo_unitario"
              value={produto.tipo_unitario}
              onChange={(e) => handleChange(index, e)}
              required
            />

            <label>Quantidade:</label>
            <input
              type="number"
              name="quantidade"
              value={produto.quantidade || ""}
              onChange={(e) => handleChange(index, e)}
              min="1"
              required
            />

            <label>Andar:</label>
            <input
              type="text"
              name="andar"
              value={produto.andar}
              onChange={(e) => handleChange(index, e)}
            />

            <label>Sala:</label>
            <input
              type="text"
              name="sala"
              value={produto.sala}
              onChange={(e) => handleChange(index, e)}
            />

            <label>Armário:</label>
            <input
              type="text"
              name="armario"
              value={produto.armario}
              onChange={(e) => handleChange(index, e)}
            />
          </div>
        </div>
      ))}

      <div className="product-actions">
        <button type="button" className="add-button" onClick={handleAddProduct}>
          + Adicionar Produto
        </button>

        {produtos.length > 1 && (
          <button
            type="button"
            className="remove-button"
            onClick={handleRemoveProduct}
          >
            - Remover Último
          </button>
        )}
      </div>

      <div className="navigation-buttons">
        <button
          type="button"
          className="prev-button"
          onClick={() => showSection("compra-section")}
        >
          Anterior
        </button>
        <button
          type="button"
          className="next-button"
          onClick={() => showSection("projeto-section")}
        >
          Próximo
        </button>
      </div>
    </fieldset>
  );
};

export default ProdutosSection;
