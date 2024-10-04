import React from "react";
import { useNavigate } from "react-router-dom"; // Importa o hook useNavigate
import './CadastroCompra.css';

function CadastroCompra() {
  const navigate = useNavigate(); // Inicializa o useNavigate

  const handleCancel = () => {
    navigate(-1); // Retorna à tela anterior
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

        {/* Informações de produto */}
        <fieldset className="form-section">
          <legend>Informações de produto</legend>
          <div className="form-group">
            <label>Nome:</label>
            <input type="text" />
            <label>Número de série:</label>
            <input type="text" />
            <label>Fabricante:</label>
            <input type="text" />
          </div>

          <div className="form-group">
            <label>Descrição do item:</label>
            <input type="text" />
            <label>Tipo unitário:</label>
            <input type="text" />
            <label>Quantidade:</label>
            <input type="number" />
          </div>
        </fieldset>

        {/* Informações de armazenamento */}
        <fieldset className="form-section">
          <legend>Informações de armazenamento</legend>
          <div className="form-group">
            <label>Andar:</label>
            <input type="text" />
            <label>Sala:</label>
            <input type="text" />
            <label>Armário:</label>
            <input type="text" />
          </div>
        </fieldset>

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
