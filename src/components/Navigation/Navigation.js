import React from 'react';
import { NavLink, Link  } from 'react-router-dom';
import './Navigation.css';

function Navigation() {
  return (
    <nav className="navbar">
      <Link to="/home" className="navbar-brand">
      StockMaster
          </Link>

      <ul className="navbar-list">
        <li className="navbar-item">
          <NavLink
            to="/cadastro-compra"
            className={({ isActive }) =>
              isActive ? "navbar-link active" : "navbar-link"
            }
          >
            Cadastro de compra
          </NavLink>
        </li>
        <li className="navbar-item">
          <NavLink
            to="/estoque"
            className={({ isActive }) =>
              isActive ? "navbar-link active" : "navbar-link"
            }
          >
            Estoque
          </NavLink>
        </li>
        <li className="navbar-item">
          <NavLink
            to="/historico-compras"
            className={({ isActive }) =>
              isActive ? "navbar-link active" : "navbar-link"
            }
          >
            Histórico de compra
          </NavLink>
        </li>
        <li className="navbar-item">
          <NavLink
            to="/configuracoes"
            className={({ isActive }) =>
              isActive ? "navbar-link active" : "navbar-link"
            }
          >
            Configurações
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
