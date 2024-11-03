import React, { useState } from 'react';
import './Login.css';
import { Link } from "react-router-dom";

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
        <div className="login-section">
        <h2>Seja Bem Vindo!</h2>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        {successMessage && <div className="success-message">{successMessage}</div>}
        <div className="input-container">
          <input className='InputLogin'
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-container">
          <input className='InputLogin'
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {/* <button className="login-btn" onClick={handleLogin}>LOGIN</button> */}
        <Link className="login-btn" to="/home">LOGIN</Link>
      </div>
      <div className="welcome-section">
        <div className='containetTexts'>
        <p className='MArcalogin'>
         StockMaster
        </p>
        <p className='textlogin'>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.
        </p>
      </div>
        </div>
      
       
    
    </div>
  );
}

export default Login;
