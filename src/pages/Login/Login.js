import React, { useState } from 'react';
import './Login.css';
import logo from './StockMaster.png'

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('Usuário:', username);
    console.log('Senha:', password);
  };

  return (
    <div className="login-page">
      <div className="welcome-section">
      <img img src={logo} alt="Logo" className="logo" />
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.
        </p>
      </div>
      <div className="login-section">
        <h2>Seja Bem Vindo!</h2>
        <div className="input-container">
          <input
            type="text"
            placeholder="Usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="input-container">
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="login-btn" onClick={handleLogin}>LOGIN</button>
      </div>
    </div>
  );
}

export default Login;
