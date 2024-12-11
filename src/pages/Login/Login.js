import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate(); // Para redirecionar após o login

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Token:", data.token);
        localStorage.setItem("token", data.token); // Armazena o token no localStorage
        setSuccessMessage("Login realizado com sucesso!");
        setErrorMessage("");
        navigate("/home"); // Redireciona para a página Home
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
    <div className="login-page">
      <div className="login-section">
        <h2>Seja Bem-Vindo!</h2>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}
        <div className="input-container">
          <input
            className="InputLogin"
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-container">
          <input
            className="InputLogin"
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="login-btn" onClick={handleLogin}>
          LOGIN
        </button>
        <div className="container-link-register">
        <p className="signup-link">
          Não tem uma conta? <a href="/cadastro">Cadastre-se aqui</a>
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

export default Login;
