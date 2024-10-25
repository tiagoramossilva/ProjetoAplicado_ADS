import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../config/firebase";
import "./CadastroCompra.css";

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
    },
    cliente: {
      razao_social: "",
    },
    razao_social: {
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

  const validateFields = () => {
    const allInputs = document.querySelectorAll("input");
    let hasError = false;

    allInputs.forEach((input) => {
      if (input.value.trim() === "") {
        input.classList.add("errorInput");
        hasError = true;
      } else {
        input.classList.remove("errorInput");
      }
    });

    return !hasError;
  };

  const handleInputFocus = (event) => {
    event.target.classList.remove("errorInput");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const isValid = validateFields();

    if (!isValid) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }

    try {
      const fornecedorRef = await addDoc(
        collection(db, "fornecedores"),
        formData.fornecedor
      );
      const clienteRef = await addDoc(
        collection(db, "clientes"),
        formData.cliente
      );
      const razao_socialRef = await addDoc(
        collection(db, "razoesSociais"),
        formData.razao_social
      );

      const produtosRefs = await Promise.all(
        produtos.map(async (produto) => {
          const { andar, sala, armario, ...produtoInfo } = produto;

          const produtoRef = await addDoc(
            collection(db, "produtos"),
            produtoInfo
          );

          await addDoc(collection(db, "locaisArmazenamento"), {
            andar,
            sala,
            armario,
            produtoId: produtoRef.id,
          });

          return produtoRef.id;
        })
      );

      const compraData = {
        clienteId: clienteRef.id,
        fornecedorId: fornecedorRef.id,
        razaoSocialId: razao_socialRef.id,
        produtosIds: produtosRefs,
        ...formData.compra,
        projeto: formData.projeto,
        adicionais: formData.adicionais,
        timestamp: new Date(),
      };

      const compraRef = await addDoc(collection(db, "compras"), compraData);
      console.log("Compra registrada com sucesso, ID: ", compraRef.id);
      alert("Compra cadastrada com sucesso!");
      navigate(-1);
    } catch (error) {
      console.error("Erro ao cadastrar a compra: ", error);
      alert("Erro ao cadastrar a compra. Tente novamente.");
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
            <label>Razão social:</label>
            <input
              type="text"
              name="fornecedor.razao_social"
              onChange={handleFormChange}
              onFocus={handleInputFocus}
            />
            <label>CNPJ:</label>
            <input
              type="text"
              name="razao_social.cnpj"
              onChange={handleFormChange}
              onFocus={handleInputFocus}
            />
            <label>Inscrição estadual:</label>
            <input
              type="text"
              name="razao_social.inscricao_estadual"
              onChange={handleFormChange}
              onFocus={handleInputFocus}
            />
          </div>
          <div className="form-group">
            <label>Endereço:</label>
            <input
              type="text"
              name="razao_social.endereco"
              onChange={handleFormChange}
              onFocus={handleInputFocus}
            />
          </div>
          <div className="form-group">
            <label>Município:</label>
            <input
              type="text"
              name="razao_social.municipio"
              onChange={handleFormChange}
              onFocus={handleInputFocus}
            />
            <label>UF:</label>
            <input
              type="text"
              name="razao_social.uf"
              onChange={handleFormChange}
              onFocus={handleInputFocus}
            />
            <label>CEP:</label>
            <input
              type="text"
              name="razao_social.cep"
              onChange={handleFormChange}
              onFocus={handleInputFocus}
            />
            <label>Bairro:</label>
            <input
              type="text"
              name="razao_social.bairro"
              onChange={handleFormChange}
              onFocus={handleInputFocus}
            />
            <label>Telefone:</label>
            <input
              type="text"
              name="razao_social.telefone"
              onChange={handleFormChange}
              onFocus={handleInputFocus}
            />
          </div>
        </fieldset>

        {/* Informações do cliente */}
        <fieldset className="form-section">
          <legend>Informações do Cliente</legend>
          <div className="form-group">
            <label>Razão social:</label>
            <input
              type="text"
              name="fornecedor.razao_social"
              onChange={handleFormChange}
              onFocus={handleInputFocus}
            />
            <label>CNPJ:</label>
            <input
              type="text"
              name="razao_social.cnpj"
              onChange={handleFormChange}
              onFocus={handleInputFocus}
            />
            <label>Inscrição estadual:</label>
            <input
              type="text"
              name="razao_social.inscricao_estadual"
              onChange={handleFormChange}
              onFocus={handleInputFocus}
            />
          </div>
          <div className="form-group">
            <label>Endereço:</label>
            <input
              type="text"
              name="razao_social.endereco"
              onChange={handleFormChange}
              onFocus={handleInputFocus}
            />
          </div>
          <div className="form-group">
            <label>Município:</label>
            <input
              type="text"
              name="razao_social.municipio"
              onChange={handleFormChange}
              onFocus={handleInputFocus}
            />
            <label>UF:</label>
            <input
              type="text"
              name="razao_social.uf"
              onChange={handleFormChange}
              onFocus={handleInputFocus}
            />
            <label>CEP:</label>
            <input
              type="text"
              name="razao_social.cep"
              onChange={handleFormChange}
              onFocus={handleInputFocus}
            />
            <label>Bairro:</label>
            <input
              type="text"
              name="razao_social.bairro"
              onChange={handleFormChange}
              onFocus={handleInputFocus}
            />
            <label>Telefone:</label>
            <input
              type="text"
              name="razao_social.telefone"
              onChange={handleFormChange}
              onFocus={handleInputFocus}
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
              onFocus={handleInputFocus}
            />
            <label>Data de emissão:</label>
            <input
              type="date"
              name="compra.data_emissao"
              onChange={handleFormChange}
              onFocus={handleInputFocus}
            />
            <label>Data de envio:</label>
            <input
              type="date"
              name="compra.data_envio"
              onChange={handleFormChange}
              onFocus={handleInputFocus}
            />
            <label>Valor total:</label>
            <input
              type="number"
              name="compra.valor_total"
              onChange={handleFormChange}
              onFocus={handleInputFocus}
            />
          </div>
        </fieldset>

         {/* Informações do produto */}
        {/* Informações do produto */}
        <fieldset className="form-section">
          <legend>Informações do produto</legend>
          {produtos.map((produto, index) => (
            <div key={index} className="form-group-grid">
              <div className="form-item">
                <label>Nome do produto:</label>
                <input
                  type="text"
                  name="nome"
                  value={produto.nome}
                  onChange={(event) => handleChange(index, event)}
                  onFocus={handleInputFocus}
                />
              </div>
              <div className="form-item">
                <label>Número de série:</label>
                <input
                  type="text"
                  name="numero_serie"
                  value={produto.numero_serie}
                  onChange={(event) => handleChange(index, event)}
                  onFocus={handleInputFocus}
                />
              </div>
              <div className="form-item">
                <label>Fabricante:</label>
                <input
                  type="text"
                  name="fabricante"
                  value={produto.fabricante}
                  onChange={(event) => handleChange(index, event)}
                  onFocus={handleInputFocus}
                />
              </div>
              <div className="form-item">
                <label>Descrição:</label>
                <input
                  type="text"
                  name="descricao"
                  value={produto.descricao}
                  onChange={(event) => handleChange(index, event)}
                  onFocus={handleInputFocus}
                />
              </div>
              <div className="form-item">
                <label>Tipo unitário:</label>
                <input
                  type="text"
                  name="tipo_unitario"
                  value={produto.tipo_unitario}
                  onChange={(event) => handleChange(index, event)}
                  onFocus={handleInputFocus}
                />
              </div>
              <div className="form-item">
                <label>Quantidade:</label>
                <input
                  type="number"
                  name="quantidade"
                  value={produto.quantidade}
                  onChange={(event) => handleChange(index, event)}
                  onFocus={handleInputFocus}
                />
              </div>
              <div className="form-item">
                <label>Andar:</label>
                <input
                  type="text"
                  name="andar"
                  value={produto.andar}
                  onChange={(event) => handleChange(index, event)}
                  onFocus={handleInputFocus}
                />
              </div>
              <div className="form-item">
                <label>Sala:</label>
                <input
                  type="text"
                  name="sala"
                  value={produto.sala}
                  onChange={(event) => handleChange(index, event)}
                  onFocus={handleInputFocus}
                />
              </div>
              <div className="form-item">
                <label>Armário:</label>
                <input
                  type="text"
                  name="armario"
                  value={produto.armario}
                  onChange={(event) => handleChange(index, event)}
                  onFocus={handleInputFocus}
                />
              </div>
            </div>
          ))}
          <button type="button" onClick={handleAddProduct}>
            Adicionar Produto
          </button>
          <button type="button" onClick={handleRemoveProduct}>
            Remover Produto
          </button>
        </fieldset>

        {/* Informações do projeto */}
        <fieldset className="form-section-grid">
          <legend>Informações do projeto</legend>
          <div className="form-group-grid">
            <div className="form-item">
              <label>Nome do projeto:</label>
              <input
                type="text"
                name="projeto.nome_projeto"
                onChange={handleFormChange}
                onFocus={handleInputFocus}
              />
            </div>
            <div className="form-item">
              <label>Responsável técnico:</label>
              <input
                type="text"
                name="projeto.responsavel_tecnico"
                onChange={handleFormChange}
                onFocus={handleInputFocus}
              />
            </div>
            <div className="form-item">
              <label>Gerente do projeto:</label>
              <input
                type="text"
                name="projeto.gerente_projeto"
                onChange={handleFormChange}
                onFocus={handleInputFocus}
              />
            </div>
            <div className="form-item">
              <label>Cliente:</label>
              <input
                type="text"
                name="projeto.cliente"
                onChange={handleFormChange}
                onFocus={handleInputFocus}
              />
            </div>
          </div>
        </fieldset>

        {/* Botões */}
        <div className="form-actions">
          <button type="button" onClick={handleCancel}>
            Cancelar
          </button>
          <button type="submit">Salvar</button>
        </div>
      </form>
    </div>
  );
}

export default CadastroCompra;

