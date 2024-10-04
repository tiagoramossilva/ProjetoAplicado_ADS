import React from 'react';
import { FaUpload, FaBox, FaHistory } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const navigate = useNavigate();

  const handleUploadClick = () => {
    navigate('/cadastro-compra');
  };

  return (
    <div className="home-container">
      <div className="card" onClick={handleUploadClick}>
        <div className="icon-container upload-icon">
          <FaUpload className='iconUpload'/>
        </div>
        <p className="card-title">Upload de Invoices</p>
      </div>

      <div className="card">
        <div className="icon-container stock-icon">
          <FaBox className='iconUpload'/>
        </div>
        <p className="card-title">Controle de estoques</p>
      </div>

      <div className="card">
        <div className="icon-container history-icon">
          <FaHistory className='iconUpload'/>
        </div>
        <p className="card-title">Histórico de compras</p>
      </div>
    </div>
  );
}

export default Home;
