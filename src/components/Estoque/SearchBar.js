import React from "react";
import { IoSearchOutline } from "react-icons/io5";
import "./SearchField.css"

const SearchField = ({ placeholder, value, onChange }) => (
  <div className="estoque-searchfield">
    <input
      className="estoque-search-input"
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
    <button className="estoque-search-button" type="button">
      <IoSearchOutline className="estoque-search-icon" />
    </button>
  </div>
);


export const SearchBar = ({ searchQuery, setSearchQuery }) => {
  const searchFields = [
    { key: "nome", placeholder: "Item" },
    { key: "andar", placeholder: "Andar" },
    { key: "sala", placeholder: "Sala" },
    { key: "armario", placeholder: "Armário" },
    { key: "nome_projeto", placeholder: "Projeto" },
  ];

  return (
    <div className="estoque-search-bar">
      {searchFields.map(({ key, placeholder }) => (
        <SearchField
          key={key}
          placeholder={placeholder}
          value={searchQuery[key]}
          onChange={(e) =>
            setSearchQuery({ ...searchQuery, [key]: e.target.value })
          }
        />
      ))}
    </div>
  );
};