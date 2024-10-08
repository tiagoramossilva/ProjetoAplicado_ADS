import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importa o hook useNavigate
import './CadastroCompra.css';

function CadastroCompra() {
  const navigate = useNavigate(); // Inicializa o useNavigate
  const [produtos, setProdutos] = useState([
    { nome: '', numero_serie: '', fabricante: '', descricao: '', tipo_unitario: '', quantidade: '', andar: '', sala: '', armario: '' },
  ]);

  const handleCancel = () => {
    navigate(-1); // Retorna à tela anterior
  };

  
  const handleAddProduct = () => {
    setProdutos([...produtos, { nome: '', numero_serie: '', fabricante: '', descricao: '', tipo_unitario: '', quantidade: '', andar: '', sala: '', armario: '' }]);
  };

  const handleRemoveProduct = () => {
    if (produtos.length > 1) {
      setProdutos(produtos.slice(0, -1));
    }
  };

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const newProdutos = [...produtos];
    newProdutos[index][name] = value;
    setProdutos(newProdutos);
  };

  return (
    <div className="form-container">
      <h1>Cadastro de compra</h1>

      <form className="purchase-form">
        {/* Informações do fornecedor */}
        <fieldset className="form-section">
          <legend>Informações do fornecedor</legend>
          <div className="form-group">
            <label>Razão social:</label>
            <input type="text" />
            <label>CNPJ:</label>
            <input type="text" />
            <label>Inscrição estadual:</label>
            <input type="text" />
          </div>

          <div className="form-group">
            <label>Endereço:</label>
            <input type="text" />
          </div>

          <div className="form-group">
            <label>Município:</label>
            <input type="text" />
            <label>UF:</label>
            <input type="text" />
            <label>Telefone1:</label>
            <input type="text" />
            <label>Telefone2:</label>
            <input type="text" />
          </div>
        </fieldset>

        {/* Informações do cliente */}
        <fieldset className="form-section">
          <legend>Informações do cliente</legend>
          <div className="form-group">
            <label>Razão social:</label>
            <input type="text" />
            <label>CNPJ:</label>
            <input type="text" />
            <label>Inscrição estadual:</label>
            <input type="text" />
          </div>

          <div className="form-group">
            <label>Endereço:</label>
            <input type="text" />
          </div>

          <div className="form-group">
            <label>Município:</label>
            <input type="text" />
            <label>UF:</label>
            <input type="text" />
            <label>Telefone1:</label>
            <input type="text" />
            <label>Telefone2:</label>
            <input type="text" />
          </div>
        </fieldset>

        {/* Informações da compra */}
        <fieldset className="form-section">
          <legend>Informações da compra</legend>
          <div className="form-group">
            <label>Data da compra:</label>
            <input type="date" />
            <label>Data da emissão:</label>
            <input type="date" />
            <label>Data do envio:</label>
            <input type="date" />
          </div>

          <div className="form-group">
            <label>Valor por item:</label>
            <input type="text" />
            <label>Valor total:</label>
            <input type="text" />
          </div>
        </fieldset>

        {/* Informações de produto e armazenamento */}
        {produtos.map((produto, index) => (
          <fieldset className="form-section" key={index}>
            <legend>Informações do produto</legend>
            <div className="form-group">
              <label>Nome:</label>
              <input type="text" name="nome" value={produto.nome} onChange={event => handleChange(index, event)} />
              <label>Número de série:</label>
              <input type="text" name="numero_serie" value={produto.numero_serie} onChange={event => handleChange(index, event)} />
              <label>Fabricante:</label>
              <input type="text" name="fabricante" value={produto.fabricante} onChange={event => handleChange(index, event)} />
            </div>

            <div className="form-group">
              <label>Descrição do item:</label>
              <input type="text" name="descricao" value={produto.descricao} onChange={event => handleChange(index, event)} style={{ flex: 2 }} />
              <label>Tipo unitário:</label>
              <input type="text" name="tipo_unitario" value={produto.tipo_unitario} onChange={event => handleChange(index, event)} />
              <label>Quantidade:</label>
              <input type="number" name="quantidade" value={produto.quantidade} onChange={event => handleChange(index, event)} />
            </div>
            <br></br>
            <legend>Informações de armazenamento: </legend>
            <br></br>
            <div className="form-group">
              <label>Andar:</label>
              <input type="text" name="andar" value={produto.andar} onChange={event => handleChange(index, event)} />
              <label>Sala:</label>
              <input type="text" name="sala" value={produto.sala} onChange={event => handleChange(index, event)} />
              <label>Armário:</label>
              <input type="text" name="armario" value={produto.armario} onChange={event => handleChange(index, event)} />
            </div>
          </fieldset>
        ))}

        <div className="form-actions">
          <button type="button" onClick={handleAddProduct}>Adicionar Item +</button>
          <button type="button" onClick={handleRemoveProduct}>Remover Item -</button>
        </div>

        {/* Informações do Projeto */}
        <fieldset className="form-section">
          <legend>Informações do Projeto</legend>
          <div className="form-group">
            <label>Nome do projeto:</label>
            <input type="text" />
            <label>Responsável técnico:</label>
            <input type="text" />
            <label>Gerente do projeto:</label>
            <input type="text" />
          </div>

          <div className="form-group">
            <label>Cliente:</label>
            <input type="text" />
          </div>
        </fieldset>

        {/* Informações adicionais */}
        <fieldset className="form-section">
          <legend>Informações adicionais</legend>
          <div className="form-group">
            <label>Usuário:</label>
            <input type="text" />
            <label>Observações:</label>
            <input type="text" />
          </div>
        </fieldset>

        <div className="form-actions">
          <button type="button" onClick={handleCancel}>Cancelar</button>
          <button type="submit">Cadastrar</button>
        </div>
      </form>
    </div>
  );
}

export default CadastroCompra;
