import React, { useState } from "react";
import InputField from "./component/InputField"; // Importa o componente InputField
import './Cadastro.css'; 

function Cadastro({ onClose }) {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    funcao: "",
    usuario: "",
    senha: "",
    admin: false,
  });

  const [messages, setMessages] = useState({
    success: "",
    error: "",
  });

  const handleChange = ({ target }) => {
    const { name, value, type, checked } = target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/api/cadastro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessages({ success: "Cadastro realizado com sucesso!", error: "" });
        onClose();
      } else {
        const error = await response.json();
        setMessages({
          error: error.error || "Erro desconhecido. Tente novamente.",
          success: "",
        });
      }
    } catch (err) {
      console.error("Erro na solicitação:", err);
      setMessages({
        error: "Erro na solicitação. Tente novamente mais tarde.",
        success: "",
      });
    }
  };

  return (
    <div className="cadastro-container">
      <div className="cadastro-box">
        <button className="cadastro-close-btn" onClick={onClose}>×</button>
        <h2 className="cadastro-title">Cadastro de Usuário</h2>

        {messages.error && (
          <div className="cadastro-error-message">{messages.error}</div>
        )}
        {messages.success && (
          <div className="cadastro-success-message">{messages.success}</div>
        )}

        <form className="cadastro-form" onSubmit={handleSubmit}>
          <InputField
            className="cadastro-input"
            type="text"
            name="nome"
            placeholder="Nome"
            value={formData.nome}
            onChange={handleChange}
            required
          />
          <InputField
            className="cadastro-input"
            type="email"
            name="email"
            placeholder="E-mail"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <InputField
            className="cadastro-input"
            type="text"
            name="funcao"
            placeholder="Função"
            value={formData.funcao}
            onChange={handleChange}
            required
          />
          <InputField
            className="cadastro-input"
            type="text"
            name="usuario"
            placeholder="Usuário"
            value={formData.usuario}
            onChange={handleChange}
            required
          />
          <InputField
            className="cadastro-input"
            type="password"
            name="senha"
            placeholder="Senha"
            value={formData.senha}
            onChange={handleChange}
            required
          />

          <div className="cadastro-checkbox-container">
            <label className="cadastro-checkbox-label">
              <input
                type="checkbox"
                name="admin"
                className="cadastro-checkbox"
                checked={formData.admin}
                onChange={handleChange}
              />
              Administrador
            </label>
          </div>

          <button className="cadastro-btn" type="submit">
            CADASTRAR
          </button>
        </form>
      </div>
    </div>
  );
}

export default Cadastro;
