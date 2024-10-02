import React, { useState } from 'react';
import './Login.css';
import logo from './StockMaster.png';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Token:', data.token);
        setSuccessMessage('Login realizado com sucesso!');
        setErrorMessage(''); 
      } else {
        const error = await response.json();
        console.error('Erro ao fazer login:', error);
        setErrorMessage(error.error || 'Erro desconhecido. Tente novamente.');
        setSuccessMessage('');
      }
    } catch (error) {
      console.error('Erro na solicitação:', error);
      setErrorMessage('Erro na solicitação. Tente novamente mais tarde.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="login-page">
      <div className="welcome-section">
        <img src={logo} alt="Logo" className="logo" />
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.
        </p>
      </div>
      <div className="login-section">
        <h2>Seja Bem Vindo!</h2>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        {successMessage && <div className="success-message">{successMessage}</div>}
        <div className="input-container">
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
