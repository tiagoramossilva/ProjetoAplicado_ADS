import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import './Navigation.css';

function Navigation() {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <Link to="/home" className="navbar-brand">StockMaster</Link>

      <ul className="navbar-list">
        <li><NavLink to="/cadastro-compra" className="navbar-link">Cadastro de compra</NavLink></li>
        <li><NavLink to="/estoque" className="navbar-link">Estoque</NavLink></li>
        <li><NavLink to="/historico-compras" className="navbar-link">Histórico de compra</NavLink></li>

        <li className="navbar-item dropdown">
          <button className="dropdown-toggle" onClick={() => setShowDropdown(!showDropdown)}>
            Configurações
          </button>
          {showDropdown && (
            <ul className="dropdown-menu">
              <li onClick={() => navigate('/configuracoes')}>Perfil</li>
              <li onClick={handleLogout}>Sair</li>
            </ul>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
