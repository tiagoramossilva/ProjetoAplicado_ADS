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
        <li className="navbar-item">
          <NavLink to="/cadastro-compra" className={({ isActive }) => isActive ? "navbar-link active" : "navbar-link"}>
            Cadastro de compra
          </NavLink>
        </li>
        <li className="navbar-item">
          <NavLink to="/estoque" className={({ isActive }) => isActive ? "navbar-link active" : "navbar-link"}>
            Estoque
          </NavLink>
        </li>
        <li className="navbar-item">
          <NavLink to="/historico-compras" className={({ isActive }) => isActive ? "navbar-link active" : "navbar-link"}>
            Histórico de compra
          </NavLink>
        </li>

        <li className="navbar-item dropdown">
          <button
            className="navbar-link dropdown-toggle"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            Configurações ▾
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
