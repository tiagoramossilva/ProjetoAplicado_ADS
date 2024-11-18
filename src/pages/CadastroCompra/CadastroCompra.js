import React, { useState } from "react";
import "./CadastroCompra.css";
import { useNavigate } from "react-router-dom";

function CadastroCompra() {
  const navigate = useNavigate();

  const [produtos, setProdutos] = useState([
    {
      nome: "",
      numero_serie: "",
      fabricante: "",
      descricao: "",
      tipo_unitario: "",
      quantidade: "",
      andar: "",
      sala: "",
      armario: "",
    },
  ]);

  const [formData, setFormData] = useState({
    cliente: {
      razao_social_cliente: "",
      CNPJ: "",
      inscricao_estadual: "",
      endereco: "",
      bairro: "",
      CEP: "",
      municipio: "",
      UF: "",
      telefone: "",
    },
    fornecedor: {
      razao_social_fornecedor: "",
      CNPJ: "",
      inscricao_estadual: "",
      endereco: "",
      bairro: "",
      CEP: "",
      municipio: "",
      UF: "",
      telefone: "",
    },
    compra: {
      data_compra: "",
      data_emissao: "",
      data_envio: "",
      valor_total: "",
    },
    projeto: {
      nome_projeto: "",
      responsavel_tecnico: "",
      gerente_projeto: "",
    },
    adicionais: {
      observacoes: "",
    },
  });

  const handleCancel = () => {
    navigate(-1);
  };

  const handleAddProduct = () => {
    setProdutos([
      ...produtos,
      {
        nome: "",
        numero_serie: "",
        fabricante: "",
        descricao: "",
        tipo_unitario: "",
        quantidade: "",
        andar: "",
        sala: "",
        armario: "",
      },
    ]);
  };

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const newProdutos = [...produtos];
    newProdutos[index][name] =
      name === "numero_serie" || name === "quantidade"
        ? parseInt(value, 10)
        : value;
    setProdutos(newProdutos);
  };

  const handleRemoveProduct = () => {
    if (produtos.length <= 1) {
      alert("Você deve ter pelo menos um produto.");
      return;
    }
    setProdutos(produtos.slice(0, -1));
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => {
      const [section, field] = name.split(".");
      return {
        ...prevState,
        [section]: {
          ...prevState[section],
          [field]: value.trim(), // Garantindo que o valor seja tratado como string
        },
      };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:3000/api/cadastro-compra",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fornecedor: formData.fornecedor,
            cliente: formData.cliente,
            compra: formData.compra,
            produtos: produtos,
            projeto: formData.projeto,
            adicionais: formData.adicionais,
          }),
        }
      );

      const responseData = await response.json();
      console.log(responseData);

      if (!response.ok) {
        throw new Error(responseData.message || "Erro ao cadastrar a compra");
      }

      alert("Compra registrada com sucesso!");
      navigate('/home')
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao registrar a compra. Tente novamente.");
    }
  };

  return (
    <>
      <div className="containertitle">
        <div className="divtitle">
          <h1>Cadastro de Compra</h1>
        </div>        
      </div>
    <div className="form-container">

      <form className="purchase-form" onSubmit={handleSubmit}>
        {/* Informações do fornecedor */}
        <fieldset className="form-section">
          <legend>Informações do fornecedor</legend>
          <div className="form-group">
            <label>Razão Social:</label>
            <input
              type="text"
              name="fornecedor.razao_social_fornecedor"
              onChange={handleFormChange}
            />
            <label>CNPJ:</label>
            <input
              type="text"
              name="fornecedor.CNPJ"
              onChange={handleFormChange}
            />
            <label>Inscrição Estadual:</label>
            <input
              type="text"
              name="fornecedor.inscricao_estadual"
              onChange={handleFormChange}
            />
          </div>
          <div className="form-group">
            <label>Endereço:</label>
            <input
              type="text"
              name="fornecedor.endereco"
              onChange={handleFormChange}
            />
            <label>Município:</label>
            <input
              type="text"
              name="fornecedor.municipio"
              onChange={handleFormChange}
            />
            <label>UF:</label>
            <input
              type="text"
              name="fornecedor.UF"
              onChange={handleFormChange}
            />
            <label>CEP:</label>
            <input
              type="text"
              name="fornecedor.CEP"
              onChange={handleFormChange}
            />
            <label>Bairro:</label>
            <input
              type="text"
              name="fornecedor.bairro"
              onChange={handleFormChange}
            />
            <label>Telefone:</label>
            <input
              type="text"
              name="fornecedor.telefone"
              onChange={handleFormChange}
            />
          </div>
        </fieldset>

        {/* Informações do cliente */}
        <fieldset className="form-section">
          <legend>Informações do cliente</legend>
          <div className="form-group">
            <label>Razão Social:</label>
            <input
              type="text"
              name="cliente.razao_social_cliente"
              onChange={handleFormChange}
            />
            <label>CNPJ:</label>
            <input
              type="text"
              name="cliente.CNPJ"
              onChange={handleFormChange}
            />
            <label>Inscrição Estadual:</label>
            <input
              type="text"
              name="cliente.inscricao_estadual"
              onChange={handleFormChange}
            />
          </div>
          <div className="form-group">
            <label>Endereço:</label>
            <input
              type="text"
              name="cliente.endereco"
              onChange={handleFormChange}
            />
            <label>Município:</label>
            <input
              type="text"
              name="cliente.municipio"
              onChange={handleFormChange}
            />
            <label>UF:</label>
            <input type="text" name="cliente.UF" onChange={handleFormChange} />
            <label>Telefone:</label>
            <input
              type="text"
              name="cliente.telefone"
              onChange={handleFormChange}
            />
            <label>CEP:</label>
            <input type="text" name="cliente.CEP" onChange={handleFormChange} />
            <label>Bairro:</label>
            <input
              type="text"
              name="cliente.bairro"
              onChange={handleFormChange}
            />
          </div>
        </fieldset>

        {/* Informações da compra */}
        <fieldset className="form-section">
          <legend>Informações da compra</legend>
          <div className="form-group">
            <label>Data da Compra:</label>
            <input
              type="date"
              name="compra.data_compra"
              onChange={handleFormChange}
            />
            <label>Data de Emissão:</label>
            <input
              type="date"
              name="compra.data_emissao"
              onChange={handleFormChange}
            />
            <label>Data de Envio:</label>
            <input
              type="date"
              name="compra.data_envio"
              onChange={handleFormChange}
            />
            <label>Valor Total:</label>
            <input
              type="number"
              name="compra.valor_total"
              step="0.01"
              onChange={handleFormChange}
            />
          </div>
        </fieldset>

        {/* Produtos */}
        <fieldset className="form-section">
          <legend>Produtos</legend>
          {produtos.map((produto, index) => (
            <div key={index} className="form-group">
              <label>Nome:</label>
              <input
                type="text"
                name="nome"
                value={produto.nome}
                onChange={(e) => handleChange(index, e)}
              />
              <label>Número de Série:</label>
              <input
                type="number"
                name="numero_serie"
                value={produto.numero_serie}
                onChange={(e) => handleChange(index, e)}
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
              />
              <label>Quantidade:</label>
              <input
                type="number"
                name="quantidade"
                value={produto.quantidade}
                onChange={(e) => handleChange(index, e)}
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
          ))}
          <button type="button" onClick={handleAddProduct} className="ButtonAdd">
            Adicionar Produto
          </button>
          <button type="button" onClick={handleRemoveProduct} className="ButtonCancel">
            Remover Produto
          </button>
        </fieldset>

        {/* Informações do projeto */}
        <fieldset className="form-section">
          <legend>Informações do projeto</legend>
          <div className="form-group">
            <label>Nome do Projeto:</label>
            <input
              type="text"
              name="projeto.nome_projeto"
              onChange={handleFormChange}
            />
            <label>Responsável Técnico:</label>
            <input
              type="text"
              name="projeto.responsavel_tecnico"
              onChange={handleFormChange}
            />
            <label>Gerente do Projeto:</label>
            <input
              type="text"
              name="projeto.gerente_projeto"
              onChange={handleFormChange}
            />
          </div>
        </fieldset>

        {/* Informações adicionais */}
        <fieldset className="form-section">
          <legend>Informações Adicionais</legend>
          <div className="form-group">
            <label>Usuário:</label>
            {/* Implementar lógica para preencher automaticamente com o usuário logado */}
            <input type="text" name="usuario" onChange={handleFormChange} />
            <label>Observações:</label>
            <textarea
              name="adicionais.observacoes"
              onChange={handleFormChange}
            ></textarea>
          </div>
        </fieldset>

        <div className="button-group">
          <button type="submit" className="ButtonAdd">Cadastrar Compra</button>
          <button type="button" onClick={handleCancel} className="ButtonCancel">
            Cancelar
          </button>
        </div>
      </form>
    </div>
    </>
  );
}

export default CadastroCompra;
