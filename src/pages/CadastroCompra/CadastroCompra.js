import React, { useState } from "react";
import "./CadastroCompra.css";
import { useNavigate } from "react-router-dom";
import Fornecedor from "../../models/Fornecedor"; // Ajuste a importação para usar a nova sintaxe
import Cliente from "../../models/Cliente"; // Faça o mesmo para Cliente e outros modelos
import Produto from "../../models/Produto";
import Estoque from "../../models/Estoque";
import LocalArmazenamento from "../../models/LocalArmazenamento";
import Compra from "../../models/Compra";

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
    fornecedor: {
      razao_social: "",
      cnpj: "",
      inscricao_estadual: "",
      endereco: "",
      municipio: "",
      cep: "",
      bairro: "",
      uf: "",
      telefone: "",
    },
    cliente: {
      razao_social: "",
      cnpj: "",
      inscricao_estadual: "",
      endereco: "",
      municipio: "",
      cep: "",
      bairro: "",
      uf: "",
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
      cliente: "",
    },
    adicionais: {
      usuario: "",
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

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    const [section, field] = name.split(".");
    setFormData((prevState) => ({
      ...prevState,
      [section]: {
        ...prevState[section],
        [field]: value,
      },
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const fornecedorId = await Fornecedor.create(formData.fornecedor);
      const clienteId = await Cliente.create(formData.cliente);

      const produtosRefs = await Promise.all(
        produtos.map(async (produto) => {
          const {
            andar,
            sala,
            armario,
            tipo_unitario,
            quantidade,
            ...produtoInfo
          } = produto;

          // Verifique se os campos obrigatórios estão preenchidos
          if (!produtoInfo.nome || !produtoInfo.fabricante) {
            throw new Error("Nome e Fabricante do produto são obrigatórios.");
          }

          const produtoId = await Produto.create(produtoInfo);
          await Estoque.create({ tipo_unitario, quantidade, produtoId });
          await LocalArmazenamento.create({ andar, sala, armario, produtoId });

          return produtoId;
        })
      );

      const compraData = {
        clienteId,
        fornecedorId,
        produtosIds: produtosRefs,
        ...formData.compra,
        projeto: formData.projeto,
        adicionais: formData.adicionais,
        timestamp: new Date(),
      };

      const compraId = await Compra.create(compraData);
      console.log("Compra registrada com sucesso, ID: ", compraId);
      alert("Compra cadastrada com sucesso!");
      navigate(-1);
    } catch (error) {
      console.error("Erro ao cadastrar a compra: ", error.message || error);
      alert(
        `Erro ao cadastrar a compra. Tente novamente. Detalhes: ${
          error.message || error
        }`
      );
    }
  };

  return (
    <div className="form-container">
      <h1>Cadastro de compra</h1>

      <form className="purchase-form" onSubmit={handleSubmit}>
        {/* Informações do fornecedor */}
        <fieldset className="form-section">
          <legend>Informações do fornecedor</legend>
          <div className="form-group">
            <label>Razão Social:</label>
            <input
              type="text"
              name="fornecedor.razao_social"
              onChange={handleFormChange}
            />
            <label>CNPJ:</label>
            <input
              type="text"
              name="fornecedor.cnpj"
              onChange={handleFormChange}
            />
            <label>Inscrição estadual:</label>
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
              name="fornecedor.uf"
              onChange={handleFormChange}
            />
            <label>CEP:</label>
            <input
              type="text"
              name="fornecedor.cep"
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
              name="cliente.razao_social"
              onChange={handleFormChange}
            />
            <label>CNPJ:</label>
            <input
              type="text"
              name="cliente.cnpj"
              onChange={handleFormChange}
            />
            <label>Inscrição estadual:</label>
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
            <input type="text" name="cliente.uf" onChange={handleFormChange} />
            <label>Telefone:</label>
            <input
              type="text"
              name="cliente.telefone"
              onChange={handleFormChange}
            />
            <label>CEP:</label>
            <input type="text" name="cliente.cep" onChange={handleFormChange} />
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
            <label>Data da compra:</label>
            <input
              type="date"
              name="compra.data_compra"
              onChange={handleFormChange}
            />
            <label>Data da emissão:</label>
            <input
              type="date"
              name="compra.data_emissao"
              onChange={handleFormChange}
            />
            <label>Data do envio:</label>
            <input
              type="date"
              name="compra.data_envio"
              onChange={handleFormChange}
            />
          </div>
          <div className="form-group">
            <label>Valor total:</label>
            <input
              type="text"
              name="compra.valor_total"
              onChange={handleFormChange}
            />
          </div>
        </fieldset>

        {/* Informações de produto e armazenamento */}
        {produtos.map((produto, index) => (
          <fieldset className="form-section" key={index}>
            <legend>Produto {index + 1}</legend>
            <div className="form-group">
              <label>Nome:</label>
              <input
                type="text"
                name="nome"
                onChange={(event) => handleChange(index, event)}
              />
              <label>Número de série:</label>
              <input
                type="text"
                name="numero_serie"
                onChange={(event) => handleChange(index, event)}
              />
              <label>Fabricante:</label>
              <input
                type="text"
                name="fabricante"
                onChange={(event) => handleChange(index, event)}
              />
              <label>Descrição:</label>
              <input
                type="text"
                name="descricao"
                onChange={(event) => handleChange(index, event)}
              />
            </div>
            <div className="form-group">
              <label>Tipo Unitário:</label>
              <input
                type="text"
                name="tipo_unitario"
                onChange={(event) => handleChange(index, event)}
              />
              <label>Quantidade:</label>
              <input
                type="number"
                name="quantidade"
                onChange={(event) => handleChange(index, event)}
              />
              <label>Andar:</label>
              <input
                type="text"
                name="andar"
                onChange={(event) => handleChange(index, event)}
              />
              <label>Sala:</label>
              <input
                type="text"
                name="sala"
                onChange={(event) => handleChange(index, event)}
              />
              <label>Armário:</label>
              <input
                type="text"
                name="armario"
                onChange={(event) => handleChange(index, event)}
              />
            </div>
          </fieldset>
        ))}

        <button type="button" onClick={handleAddProduct}>
          Adicionar Produto
        </button>
        <button type="button" onClick={handleRemoveProduct}>
          Remover Produto
        </button>

        {/* Informações do projeto e adicionais */}
        <fieldset className="form-section">
          <legend>Informações do Projeto</legend>
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
            <label>Cliente:</label>
            <input
              type="text"
              name="projeto.cliente"
              onChange={handleFormChange}
            />
          </div>
        </fieldset>

        <fieldset className="form-section">
          <legend>Adicionais</legend>
          <div className="form-group">
            <label>Usuário:</label>
            <input
              type="text"
              name="adicionais.usuario"
              onChange={handleFormChange}
            />
            <label>Observações:</label>
            <input
              type="text"
              name="adicionais.observacoes"
              onChange={handleFormChange}
            />
          </div>
        </fieldset>

        <button type="submit">Cadastrar Compra</button>
        <button type="button" onClick={handleCancel}>
          Cancelar
        </button>
      </form>
    </div>
  );
}

export default CadastroCompra;
