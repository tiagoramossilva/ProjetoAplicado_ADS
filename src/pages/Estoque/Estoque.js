import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Estoque.css";
import { FiRefreshCcw } from "react-icons/fi";
import { IoTrashBin, IoSearchOutline } from "react-icons/io5";
import Navigation from "../Navigation/Navigation";

function EstoquePage() {
  const navigate = useNavigate();
  const [produtos, setProdutos] = useState([]);
  const [searchQuery, setSearchQuery] = useState({
    nome: "",
    andar: "",
    sala: "",
    armario: "",
    nome_projeto: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [updatedData, setUpdatedData] = useState({});
  const [filteredProdutos, setFilteredProdutos] = useState([]);
  const editableFields = [
    "nome",
    "quantidade",
    "tipo_unitario",
    "andar",
    "sala",
    "armario",
  ]; // Campos editáveis

  const handleBackClick = () => {
    navigate("/home");
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const resposta = await fetch(
        "http://localhost:3000/api/produto-com-projeto",
        {
          // Nova rota
          method: "GET",
        }
      );
      const produtosData = await resposta.json();
      setProdutos(produtosData);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  };

  useEffect(() => {
    const filtered = produtos.filter((item) => {
      for (const key in searchQuery) {
        if (searchQuery[key]) {
          // Verifica se o campo de busca não está vazio
          let value = item[key];

          if (key === "nome_projeto") {
            value =
              item.compras && item.compras.length > 0 && item.compras[0].projeto
                ? item.compras[0].projeto.nome_projeto
                : null; // Define como null se não houver projeto
          }

          // Corrigido: Verifica se value é null ou undefined *antes* de chamar toString()
          if (
            value === null ||
            value === undefined ||
            !value
              .toString()
              .toLowerCase()
              .includes(searchQuery[key].toLowerCase())
          ) {
            return false; // Remove o item se o valor não corresponder ou for nulo/indefinido
          }
        }
      }
      return true; // Mantém o item se todas as condições forem atendidas
    });

    setFilteredProdutos(filtered);
  }, [produtos, searchQuery]);

  // Lógica de Paginação
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProdutos.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredProdutos.length / itemsPerPage);

  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja deletar este item?")) {
      try {
        const response = await fetch(
          `http://localhost:3000/api/produto/${id}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          setProdutos(produtos.filter((item) => item.id !== id));
          alert("Item deletado com sucesso!");
        } else {
          console.error("Erro ao deletar item:", response.status);
          alert(
            "Erro ao deletar item. Verifique o console para mais detalhes."
          );
        }
      } catch (error) {
        console.error("Erro ao deletar item:", error);
        alert("Erro ao deletar item. Verifique o console para mais detalhes.");
      }
    }
  };

  const handleUpdate = (item) => {
    setIsEditing(true);
    setCurrentItem(item);
    setUpdatedData(
      editableFields.reduce(
        (acc, field) => ({ ...acc, [field]: item[field] }),
        {}
      )
    );
  };

  const handleSaveUpdate = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/produto/${currentItem.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(
            editableFields.reduce(
              (acc, field) => ({ ...acc, [field]: updatedData[field] }),
              {}
            )
          ),
        }
      );

      if (response.ok) {
        setProdutos(
          produtos.map((item) =>
            item.id === currentItem.id ? updatedData : item
          )
        );
        alert("Item atualizado com sucesso!");
        setIsEditing(false);
        setCurrentItem(null);
        setUpdatedData({});
      } else {
        console.error("Erro ao atualizar item:", response.status);
        alert(
          "Erro ao atualizar item. Verifique o console para mais detalhes."
        );
      }
    } catch (error) {
      console.error("Erro ao atualizar item:", error);
      alert("Erro ao atualizar item. Verifique o console para mais detalhes.");
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
    <Navigation />
     <div className="containertitle">
        <div className="divtitle">
          <h1>Estoque</h1>
        </div>        
      </div>
    <div className="estoque-container">

      <div className="search-bar">
        <input
          className="search-input"
          type="text"
          placeholder="Item"
          value={searchQuery.nome}
          onChange={(e) =>
            setSearchQuery({ ...searchQuery, nome: e.target.value })
          }
        />
        <button className="search-button">
          <IoSearchOutline className="iconSearch" />
        </button>
        <input
          className="search-input"
          type="text"
          placeholder="Andar"
          value={searchQuery.andar}
          onChange={(e) =>
            setSearchQuery({ ...searchQuery, andar: e.target.value })
          }
        />
        <button className="search-button">
          <IoSearchOutline className="iconSearch" />
        </button>
        <input
          className="search-input"
          type="text"
          placeholder="Sala"
          value={searchQuery.sala}
          onChange={(e) =>
            setSearchQuery({ ...searchQuery, sala: e.target.value })
          }
        />
        <button className="search-button">
          <IoSearchOutline className="iconSearch" />
        </button>
        <input
          className="search-input"
          type="text"
          placeholder="Armário"
          value={searchQuery.armario}
          onChange={(e) =>
            setSearchQuery({ ...searchQuery, armario: e.target.value })
          }
        />
        <button className="search-button">
          <IoSearchOutline className="iconSearch" />
        </button>
        <input
          className="search-input"
          type="text"
          placeholder="Projeto"
          value={searchQuery.nome_projeto}
          onChange={(e) =>
            setSearchQuery({ ...searchQuery, nome_projeto: e.target.value })
          }
        />
        <button className="search-button">
          <IoSearchOutline className="iconSearch" />
        </button>
      </div>

      {isEditing && (
        <div className="edit-container">
          <h2>Atualizar Item</h2>
          {editableFields.map((field) => (
            <div key={field}>
              <label htmlFor={field}>{field}:</label>
              <input
                type="text"
                id={field}
                name={field}
                value={updatedData[field] || ""}
                onChange={(e) =>
                  setUpdatedData({ ...updatedData, [field]: e.target.value })
                }
              />
            </div>
          ))}
          <button onClick={handleSaveUpdate}>Salvar Atualização</button>
          <button onClick={() => setIsEditing(false)}>Cancelar</button>
        </div>
      )}

      <table className="estoque-table">
        <thead>
          <tr className="table-header-row">
            <th className="table-header">Item</th>
            <th className="table-header">Quantidade</th>
            <th className="table-header">Tipo Unitário</th>
            <th className="table-header">Andar</th>
            <th className="table-header">Sala</th>
            <th className="table-header">Armário</th>
            <th className="table-header">Projeto</th>
            <th className="table-header">Ações</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.length > 0 ? (
            currentItems.map((item) => (
              <tr className="table-row" key={item.id}>
                <td className="table-data">{item.nome || "N/A"}</td>
                <td className="table-data">{item.quantidade || "N/A"}</td>
                <td className="table-data">{item.tipo_unitario || "N/A"}</td>
                <td className="table-data">{item.andar || "N/A"}</td>
                <td className="table-data">{item.sala || "N/A"}</td>
                <td className="table-data">{item.armario || "N/A"}</td>
                <td className="table-data">
                  {item.compras &&
                  item.compras.length > 0 &&
                  item.compras[0].projeto
                    ? item.compras[0].projeto.nome_projeto
                    : "N/A"}
                </td>
                <td className="table-actions">
                  <button
                    className="action-button update-button"
                    onClick={() => handleUpdate(item)}
                  >
                    <FiRefreshCcw />
                  </button>
                  <button
                    className="action-button delete-button"
                    onClick={() => handleDelete(item.id)}
                  >
                    <IoTrashBin />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="no-data">
                Nenhum item encontrado
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="pagination">
        <button className="buttonsPagination"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        <span>
          Página {currentPage} de {totalPages}
        </span>
        <button className="buttonsPagination"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Próxima
        </button>
      </div>
      <div className="button-container">
      <button className="back-button" onClick={handleBackClick}>
        Voltar
      </button>
      </div>

    
    </div>
    </>
  );
}

export default EstoquePage;
