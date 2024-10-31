import React, { useEffect, useState } from 'react';
import './HistoricoCompras.css';
import { useNavigate } from 'react-router-dom';
import { FiRefreshCcw } from "react-icons/fi";
import { IoTrashBin } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import Fornecedor from '../../models/Fornecedor'; 
import Projeto from '../../models/Projeto'; 
import Compra from '../../models/Compra'; 

function HistoricoCompras() {
  const navigate = useNavigate();
  const [combinedData, setCombinedData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleBackClick = () => {
    navigate('/home');
  };

  const fetchData = async () => {
    try {
      const [fornecedorData, projetoData, compraData] = await Promise.all([
        Fornecedor.getAll(),
        Projeto.getAll(),
        Compra.getAll(),
      ]);

      const combined = [
        ...fornecedorData.map(item => ({ ...item, type: 'fornecedor' })),
        ...compraData.map(item => ({ ...item, type: 'compra' })),
        ...projetoData.map(item => ({ ...item, type: 'projeto' })),
      ];

      setCombinedData(combined);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = combinedData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(combinedData.length / itemsPerPage);

  return (
    <div className="historico-container">
      <h1 className="historico-title">Histórico de compras</h1>

      <div className="search-bar">
        <input className="search-input" type="text" placeholder="Fornecedor" />
        <input className="search-input" type="text" placeholder="Comprador" />
        <input className="search-input" type="date" placeholder="Data da compra" />
        <input className="search-input" type="date" placeholder="Data da emissão da invoice" />
        <input className="search-input" type="date" placeholder="Data do envio" />
        <input className="search-input" type="text" placeholder="Item" />
        <input className="search-input" type="text" placeholder="Intervalo de valor por item" />
        <input className="search-input" type="text" placeholder="Intervalo de valor por total da invoice" />
        <button className="filter-button">Filtrar</button>
      </div>

      <table className="historico-table">
        <thead>
          <tr className="table-header-row">
            <th className="table-header">Fornecedor</th>
            <th className="table-header">Data da Compra</th>
            <th className="table-header">Valor Total</th>
            <th className="table-header">Projeto</th>
            <th className="table-header">Gerente de Projeto</th>
            <th className="table-header">Ações</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item) => (
            <tr className="table-row" key={`${item.id}-${item.type}`}>
              <td className="table-data">{item.razao_social || 'N/A'}</td> 
              <td className="table-data">{item.dataCompra || 'N/A'}</td>
              <td className="table-data">R$ {item.valorTotal ? item.valorTotal.toFixed(2) : 'N/A'}</td>
              <td className="table-data">{item.nome_projeto || 'N/A'}</td>
              <td className="table-data">{item.gerente_projeto || 'N/A'}</td>
              <td className="table-actions">
                <button className="action-button edit-button">
                  <FaEdit />
                </button>
                <button className="action-button delete-button">
                  <IoTrashBin />
                </button>
                <button className="action-button refresh-button">
                  <FiRefreshCcw />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Paginação */}
      <div className="pagination">
        <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}>Anterior</button>
        <span>Página {currentPage} de {totalPages}</span>
        <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}>Próxima</button>
      </div>

      <div className="button-container">
        <button className="historico-button">Cadastrar projeto</button>
        <button className="historico-button">Cadastrar fornecedor</button>
        <button className="historico-button voltar-button" onClick={handleBackClick}>Voltar</button>
      </div>
    </div>
  );
}

export default HistoricoCompras;
