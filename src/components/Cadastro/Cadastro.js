import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../Login/Login.css"; // Reutiliza o CSS do Login
import InputField from "./component/InputField"; // Importa o componente InputField

function Cadastro() {
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

  const navigate = useNavigate();

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
        navigate("/home");
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
    <div className="login-page">
      <div className="login-section">
        <h2>Cadastro de Usuário</h2>

        {messages.error && (
          <div className="error-message">{messages.error}</div>
        )}
        {messages.success && (
          <div className="success-message">{messages.success}</div>
        )}

        <form onSubmit={handleSubmit}>
          <InputField
            type="text"
            name="nome"
            placeholder="Nome"
            value={formData.nome}
            onChange={handleChange}
            required
          />
          <InputField
            type="email"
            name="email"
            placeholder="E-mail"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <InputField
            type="text"
            name="funcao"
            placeholder="Função"
            value={formData.funcao}
            onChange={handleChange}
            required
          />
          <InputField
            type="text"
            name="usuario"
            placeholder="Usuário"
            value={formData.usuario}
            onChange={handleChange}
            required
          />
          <InputField
            type="password"
            name="senha"
            placeholder="Senha"
            value={formData.senha}
            onChange={handleChange}
            required
          />

          <div className="input-container">
            <label style={{ color: "#939393" }}>
              <input
                type="checkbox"
                name="admin"
                className="checkbox"
                checked={formData.admin}
                onChange={handleChange}
              />
              Administrador
            </label>
          </div>

          <button className="login-btn" type="submit">
            CADASTRAR
          </button>
        </form>

        <div className="container-link-register">
          <p className="signup-link">
            Já tem uma conta? <Link to="/">Faça login aqui</Link>
          </p>
        </div>
      </div>

      <div className="welcome-section">
        <div className="containetTexts">
          <p className="MArcalogin">StockMaster</p>
          <p className="textlogin">
            Gestão de Estoque e Compras Inteligente para a Eficiência da Sua
            Empresa.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Cadastro;
