import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Login/Login.css"; // Reutiliza o CSS do Login

function Cadastro() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    funcao: "",
    admin: false,
    usuario: "",
    senha: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate(); // Para redirecionar após o cadastro

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/cadastro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccessMessage("Cadastro realizado com sucesso!");
        setErrorMessage("");
        navigate("/home");
      } else {
        const error = await response.json();
        setErrorMessage(error.error || "Erro desconhecido. Tente novamente.");
        setSuccessMessage("");
      }
    } catch (error) {
      console.error("Erro na solicitação:", error);
      setErrorMessage("Erro na solicitação. Tente novamente mais tarde.");
      setSuccessMessage("");
    }
  };

  return (
    <div className="login-page"> {/* Reutiliza a estrutura da página de login */}
      <div className="login-section">
        <h2>Cadastro de Usuário</h2>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}
        <div className="input-container">
          <input
            className="InputLogin"
            type="text"
            name="nome"
            placeholder="Nome"
            value={formData.nome}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-container">
          <input
            className="InputLogin"
            type="email"
            name="email"
            placeholder="E-mail"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-container">
          <input
            className="InputLogin"
            type="text"
            name="funcao"
            placeholder="Função"
            value={formData.funcao}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-container">
          <input
            className="InputLogin"
            type="text"
            name="usuario"
            placeholder="Usuário"
            value={formData.usuario}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-container">
          <input
            className="InputLogin"
            type="password"
            name="senha"
            placeholder="Senha"
            value={formData.senha}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-container">
          <label style={{ color: "#939393" }}>
            <input
              type="checkbox"
              name="admin"
              checked={formData.admin}
              onChange={handleChange}
            />
            Administrador
          </label>
        </div>
        <button className="login-btn" onClick={handleSubmit}>
          CADASTRAR
        </button>
        <p className="signup-link">
          Já tem uma conta? <a href="/">Faça login aqui</a>
        </p>
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
