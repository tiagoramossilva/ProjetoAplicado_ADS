import React from "react";

const FiltrosCompras = ({ filters, onFilterChange, onRefresh }) => {
  return (
    <div className="search-bar">
      <input
        className="search-input"
        type="text"
        name="fornecedor"
        placeholder="Fornecedor"
        value={filters.fornecedor}
        onChange={onFilterChange}
      />
      <input
        className="search-input"
        type="date"
        name="dataCompra"
        value={filters.dataCompra}
        onChange={onFilterChange}
      />
      <input
        className="search-input"
        type="number"
        name="valorMin"
        placeholder="Valor mínimo"
        value={filters.valorMin}
        onChange={onFilterChange}
        min="0"
        step="0.01"
      />
      <input
        className="search-input"
        type="number"
        name="valorMax"
        placeholder="Valor máximo"
        value={filters.valorMax}
        onChange={onFilterChange}
        min="0"
        step="0.01"
      />
      <button 
        className="filter-button"
        onClick={onRefresh}
      >
        Atualizar
      </button>
    </div>
  );
};

export default FiltrosCompras;