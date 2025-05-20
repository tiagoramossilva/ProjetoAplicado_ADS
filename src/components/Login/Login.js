import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/authService";
import InputField from "./components/InputField";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState({ type: "", text: "" });
  const navigate = useNavigate();

  const handleLogin = useCallback(async () => {
    try {
      const data = await login(email, password);
      localStorage.setItem("token", data.token);
      setMessage({ type: "success", text: "Login realizado com sucesso!" });
      navigate("/home");
    } catch (error) {
      console.error("Erro no login:", error);
      setMessage({ type: "error", text: error.message });
    }
  }, [email, password, navigate]);

  return (
    <div className="login-wrapper">
      
      {/* Lado esquerdo com texto e fundo ilustrativo */}
      <div className="welcome-section">
        <div className="login-brand">
          <h1>StockMaster</h1>
          <p>
            Gestão de Estoque e Compras Inteligente<br />
            para a Eficiência da Sua Empresa.
          </p>
        </div>
      </div>

      {/* Lado direito com o formulário */}
<div className="login-section">
  <h2>Seja bem-vindo</h2>

  {message.text && (
    <div className={message.type === "error" ? "error-message" : "success-message"}>
      {message.text}
    </div>
  )}

  <form onSubmit={(e) => e.preventDefault()}>
    <InputField
      type="email"
      placeholder="E-mail"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />
    <InputField
      type="password"
      placeholder="Senha"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />
    <button className="login-btn" onClick={handleLogin}>
      LOGIN
    </button>
  </form>
</div>

    </div>
  );
}

export default Login;
