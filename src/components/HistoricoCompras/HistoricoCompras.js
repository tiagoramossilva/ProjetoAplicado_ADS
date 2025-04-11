import React from "react";
import Navigation from "../Navigation/Navigation";
import FiltrosCompras from "./FiltrosCompras.js";
import ComprasTable from "./ComprasTable.js";
import useCompras from "./hooks/useCompras.js";
import "./HistoricoCompras.css";

const HistoricoCompras = () => {
  const {
    compras,
    filters,
    currentPage,
    totalPages,
    currentItems,
    handleFilterChange,
    handlePageChange,
    fetchData,
    handleDeleteCompra,
  } = useCompras();


  return (
    <>
      <Navigation />
      <div className="containertitle">
        <div className="divtitle">
          <h1>Histórico de compras</h1>
        </div>
      </div>

      <div className="historico-container">
        <FiltrosCompras
          filters={filters}
          onFilterChange={handleFilterChange}
          onRefresh={fetchData}
        />

        <ComprasTable compras={currentItems} onDelete={handleDeleteCompra} />

        <div className="pagination">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="buttonsPagination"
          >
            Anterior
          </button>
          <span>
            Página {currentPage} de {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="buttonsPagination"
          >
            Próxima
          </button>
        </div>
      </div>
    </>
  );
};

export default HistoricoCompras;
