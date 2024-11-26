import React, { useState } from 'react';
import { FaUpload, FaBox, FaHistory, FaCog } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleUploadClick = () => {
    navigate('/cadastro-compra');
  };

  const handleStockClick = () => {
    navigate('/estoque'); 
  };

  const handleHistoricoClick = () => {
    navigate('/historico-compras'); 
  };

  const handleConfigClick = () => {
    setShowDropdown(!showDropdown); 
  };

  const handleUserClick = () => {
    navigate('/usuarios'); 
  };

  const handleLogoutClick = () => {
    setShowModal(true); 
  };

  const confirmLogout = () => {
    setShowModal(false);
    navigate('/'); 
  };

  const cancelLogout = () => {
    setShowModal(false); 
  };

  return (
    <>
      <div className='containerhomeconfig'>
        <div className="config-button">
          <div className="icon-container upload-icon">
            <FaCog onClick={handleConfigClick} />
          </div>
          {showDropdown && (
            <div className="dropdown-menu">
              <p onClick={handleUserClick}>Usuários</p>
              <p onClick={handleLogoutClick}>Sair</p>
            </div>
          )}
        </div>
      </div>

      <div className="home-container">
        <div className="card" onClick={handleUploadClick}>
          <div className="icon-container upload-icon">
            <FaUpload className='iconUpload'/>
          </div>
          <p className="card-title">Upload de Invoices</p>
        </div>

        <div className="card" onClick={handleStockClick}>
          <div className="icon-container stock-icon">
            <FaBox className='iconUpload'/>
          </div>
          <p className="card-title">Controle de estoques</p>
        </div>

        <div className="card" onClick={handleHistoricoClick}>
          <div className="icon-container history-icon">
            <FaHistory className='iconUpload'/>
          </div>
          <p className="card-title">Histórico de compras</p>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <p>Tem certeza que deseja sair?</p>
            <div className="modal-buttons">
              <button onClick={confirmLogout}>Sim</button>
              <button onClick={cancelLogout}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
