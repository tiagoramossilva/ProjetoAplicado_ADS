import React, { useState } from "react";
import "./CadastroCompra.css";
import { useNavigate } from "react-router-dom";
import FornecedorController from "../../controller/FornecedorController";
import ClienteController from "../../controller/ClienteController";
import ProdutoController from "../../controller/ProdutoController";
import EstoqueController from "../../controller/EstoqueController";
import LocalArmazenamentoController from "../../controller/LocalArmazenamentoController";
import CompraController from "../../controller/CompraController";
import UsuarioController from "../../controller/UsuarioController";
import ProjetoController from "../../controller/ProjetoController";
import RazaoSocialController from "../../controller/RazaoSocialController";

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
      razao_social: {
        CNPJ: "",
        inscricao_estadual: "",
        endereco: "",
        bairro: "",
        CEP: "",
        municipio: "",
        UF: "",
        telefone: "",
      },
    },
    fornecedor: {
      razao_social_fornecedor: "",
      razao_social: {
        CNPJ: "",
        inscricao_estadual: "",
        endereco: "",
        bairro: "",
        CEP: "",
        municipio: "",
        UF: "",
        telefone: "",
      },
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
      // Criação da Razão Social do Fornecedor
      const razaoSocialFornecedorId = await RazaoSocialController.create(
        formData.fornecedor.razao_social
      );

      const fornecedorData = {
        ...formData.fornecedor,
        razao_social_id: razaoSocialFornecedorId,
      };
      const fornecedorId = await FornecedorController.create(fornecedorData);

      // Criação da Razão Social do Cliente
      const razaoSocialClienteId = await RazaoSocialController.create(
        formData.cliente.razao_social
      );

      const clienteData = {
        ...formData.cliente,
        razao_social_id: razaoSocialClienteId,
      };
      const clienteId = await ClienteController.create(clienteData);

      // Criação da Compra
      const compraId = await CompraController.create(formData.compra);

      // Criação dos produtos e suas referências
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

          if (!produtoInfo.nome || !produtoInfo.fabricante) {
            throw new Error("Nome e Fabricante do produto são obrigatórios.");
          }

          const produtoId = await ProdutoController.create(produtoInfo);

          await EstoqueController.create({
            tipo_unitario,
            quantidade,
            produtoId,
          });

          await LocalArmazenamentoController.create({
            andar,
            sala,
            armario,
            produtoId,
          });

          return produtoId;
        })
      );

      // Criação do Projeto
      const projetoId = await ProjetoController.create(formData.projeto);

      // Informações adicionais do Usuário
      const infoAdicionaisId = await UsuarioController.info_adicionais(
        formData.adicionais
      );

      const dataToSend = {
        fornecedor: fornecedorData,
        cliente: clienteData,
        compra: formData.compra,
        projeto: formData.projeto,
        adicionais: formData.adicionais,
        produtos: produtos,
      };

      const response = await fetch("http://localhost:3000/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      // Verifica a resposta da API e analisa o status
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({})); // Ler detalhes do erro, se houver
        throw new Error(
          `Falha no envio dos dados para a API: ${errorData.message || "Erro desconhecido"}`
        );
      }

      alert("Compra cadastrada com sucesso!");
    } catch (error) {
      console.error("Erro ao cadastrar a compra: ", error.message || error);
      alert(`Erro ao cadastrar a compra. Tente novamente. Detalhes: ${error.message || error}`);
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
            <input type="text" name="fornecedor.razao_social_fornecedor" onChange={handleFormChange} />
            <label>CNPJ:</label>
            <input type="text" name="fornecedor.razao_social.cnpj" onChange={handleFormChange} />
            <label>Inscrição estadual:</label>
            <input type="text" name="fornecedor.razao_social.inscricao_estadual" onChange={handleFormChange} />
          </div>
          <div className="form-group">
            <label>Endereço:</label>
            <input type="text" name="fornecedor.razao_social.endereco" onChange={handleFormChange} />
            <label>Município:</label>
            <input type="text" name="fornecedor.razao_social.municipio" onChange={handleFormChange} />
            <label>UF:</label>
            <input type="text" name="fornecedor.razao_social.uf" onChange={handleFormChange} />
            <label>CEP:</label>
            <input type="text" name="fornecedor.razao_social.cep" onChange={handleFormChange} />
            <label>Bairro:</label>
            <input type="text" name="fornecedor.razao_social.bairro" onChange={handleFormChange} />
            <label>Telefone:</label>
            <input type="text" name="fornecedor.razao_social.telefone" onChange={handleFormChange} />
          </div>
        </fieldset>

        {/* Informações do cliente */}
        <fieldset className="form-section">
          <legend>Informações do cliente</legend>
          <div className="form-group">
            <label>Razão Social:</label>
            <input type="text" name="cliente.razao_social_cliente" onChange={handleFormChange} />
            <label>CNPJ:</label>
            <input type="text" name="cliente.razao_social.cnpj" onChange={handleFormChange} />
            <label>Inscrição estadual:</label>
            <input type="text" name="cliente.razao_social.inscricao_estadual" onChange={handleFormChange} />
          </div>
          <div className="form-group">
            <label>Endereço:</label>
            <input type="text" name="cliente.razao_social.endereco" onChange={handleFormChange} />
            <label>Município:</label>
            <input type="text" name="cliente.razao_social.municipio" onChange={handleFormChange} />
            <label>UF:</label>
            <input type="text" name="cliente.razao_social.uf" onChange={handleFormChange} />
            <label>Telefone:</label>
            <input type="text" name="cliente.razao_social.telefone" onChange={handleFormChange} />
            <label>CEP:</label>
            <input type="text" name="cliente.razao_social.cep" onChange={handleFormChange} />
            <label>Bairro:</label>
            <input type="text" name="cliente.razao_social.bairro" onChange={handleFormChange} />
          </div>
        </fieldset>

        {/* Informações da compra */}
        <fieldset className="form-section">
          <legend>Informações da compra</legend>
          <div className="form-group">
            <label>Data da Compra:</label>
            <input type="date" name="compra.data_compra" onChange={handleFormChange} />
            <label>Data de Emissão:</label>
            <input type="date" name="compra.data_emissao" onChange={handleFormChange} />
            <label>Data de Envio:</label>
            <input type="date" name="compra.data_envio" onChange={handleFormChange} />
            <label>Valor Total:</label>
            <input type="number" name="compra.valor_total" onChange={handleFormChange} />
          </div>
        </fieldset>

        {/* Produtos */}
        <fieldset className="form-section">
          <legend>Produtos</legend>
          {produtos.map((produto, index) => (
            <div key={index} className="form-group">
              <label>Nome:</label>
              <input type="text" name="nome" value={produto.nome} onChange={(e) => handleChange(index, e)} />
              <label>Número de Série:</label>
              <input type="text" name="numero_serie" value={produto.numero_serie} onChange={(e) => handleChange(index, e)} />
              <label>Fabricante:</label>
              <input type="text" name="fabricante" value={produto.fabricante} onChange={(e) => handleChange(index, e)} />
              <label>Descrição:</label>
              <input type="text" name="descricao" value={produto.descricao} onChange={(e) => handleChange(index, e)} />
              <label>Tipo Unitário:</label>
              <input type="text" name="tipo_unitario" value={produto.tipo_unitario} onChange={(e) => handleChange(index, e)} />
              <label>Quantidade:</label>
              <input type="number" name="quantidade" value={produto.quantidade} onChange={(e) => handleChange(index, e)} />
              <label>Andar:</label>
              <input type="text" name="andar" value={produto.andar} onChange={(e) => handleChange(index, e)} />
              <label>Sala:</label>
              <input type="text" name="sala" value={produto.sala} onChange={(e) => handleChange(index, e)} />
              <label>Armário:</label>
              <input type="text" name="armario" value={produto.armario} onChange={(e) => handleChange(index, e)} />
            </div>
          ))}
          <button type="button" onClick={handleAddProduct}>Adicionar Produto</button>
          <button type="button" onClick={handleRemoveProduct}>Remover Produto</button>
        </fieldset>

        {/* Informações do projeto */}
        <fieldset className="form-section">
          <legend>Informações do projeto</legend>
          <div className="form-group">
            <label>Nome do Projeto:</label>
            <input type="text" name="projeto.nome_projeto" onChange={handleFormChange} />
            <label>Responsável Técnico:</label>
            <input type="text" name="projeto.responsavel_tecnico" onChange={handleFormChange} />
            <label>Gerente do Projeto:</label>
            <input type="text" name="projeto.gerente_projeto" onChange={handleFormChange} />
          </div>
        </fieldset>

        {/* Informações adicionais */}
        <fieldset className="form-section">
          <legend>Informações Adicionais</legend>
          <div className="form-group">
            <label>Usuário:</label>
            <input type="text" name="adicionais.usuario" onChange={handleFormChange} />
            <label>Observações:</label>
            <textarea name="adicionais.observacoes" onChange={handleFormChange}></textarea>
          </div>
        </fieldset>

        <div className="button-group">
          <button type="submit">Cadastrar Compra</button>
          <button type="button" onClick={handleCancel}>Cancelar</button>
        </div>
      </form>
    </div>
  );
}

export default CadastroCompra;
