import React from "react";
import { IoSearchOutline } from "react-icons/io5";

const FiltrosCompras = ({ filters, onFilterChange, onRefresh }) => {
  return (
    <div className="historico-search-bar">
      <div className="historico-searchfield">
        <input
          className="historico-search-input"
          type="text"
          name="fornecedor"
          placeholder="Fornecedor"
          value={filters.fornecedor}
          onChange={onFilterChange}
        />
        <IoSearchOutline className="historico-search-icon" />
      </div>

      <div className="historico-searchfield">
        <input
          className="historico-search-input"
          type="date"
          name="dataCompra"
          value={filters.dataCompra}
          onChange={onFilterChange}
        />
        <IoSearchOutline className="historico-search-icon" />
      </div>

      <div className="historico-searchfield">
        <input
          className="historico-search-input"
          type="number"
          name="valorMin"
          placeholder="Valor mínimo"
          value={filters.valorMin}
          onChange={onFilterChange}
          min="0"
          step="0.01"
        />
        <IoSearchOutline className="historico-search-icon" />
      </div>

      <div className="historico-searchfield">
        <input
          className="historico-search-input"
          type="number"
          name="valorMax"
          placeholder="Valor máximo"
          value={filters.valorMax}
          onChange={onFilterChange}
          min="0"
          step="0.01"
        />
        <IoSearchOutline className="historico-search-icon" />
      </div>

      <button className="historico-search-button-action" onClick={onRefresh}>
        Atualizar
      </button>
    </div>
  );
};

export default FiltrosCompras;
