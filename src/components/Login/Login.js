import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/authService";
import InputField from "./components/InputField";
import "./Login.css";
import ilustracao from './ilustration.png';


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
  <div className="login-page">
    <div className="login-card">
      <h1 className="title-stockmaster">StockMaster</h1>
      <p>Bem vindo de volta!</p>

      <form onSubmit={(e) => e.preventDefault()} className="login-form">
  <label className="input-label">Email</label>
  <input
    className="input-field"
    type="email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
  />


  <div className="password-label-row">
  <label className="input-label">Senha</label>
  <a href="#" className="forgot-password">Esqueceu sua senha?</a>
</div>

  <div className="password-wrapper">
    <input
      className="input-field"
      type="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />
    <span className="toggle-password">👁️</span>
  </div>

  <div className="checkbox-wrapper">
    <input type="checkbox" id="remember" className="checkbox-input" />
    <label htmlFor="remember" className="checkbox-label">Manter logado</label>
  </div>

  <button className="login-btn" onClick={handleLogin}>
    Login
  </button>
</form>

    </div>
    <div className="illustration-area">
      <img src={ilustracao} alt="Ilustração" />
    </div>
  </div>
);

}

export default Login;
