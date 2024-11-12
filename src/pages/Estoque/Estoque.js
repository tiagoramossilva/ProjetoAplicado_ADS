import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Estoque.css";
import { FiRefreshCcw } from "react-icons/fi";
import { IoTrashBin, IoSearchOutline } from "react-icons/io5";
import Produto from "../../repositories/Produto"; // Importando o modelo de Produto

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

  const handleBackClick = () => {
    navigate("/home");
  };

  const fetchData = async () => {
    try {
      const resposta = await fetch("http://localhost:3000/api/produto", {
        method: "GET",
      });
      const produtosData = await resposta.json(); // Buscando todos os produtos
      console.log("aquiiiiii", produtosData);
      setProdutos(produtosData);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Filtragem dos produtos com base na busca
  const filteredProdutos = produtos.filter((item) => {
    return (
      (searchQuery.nome === "" ||
        item.nome.toLowerCase().includes(searchQuery.nome.toLowerCase())) &&
      (searchQuery.andar === "" ||
        item.andar.toLowerCase().includes(searchQuery.andar.toLowerCase())) &&
      (searchQuery.sala === "" ||
        item.sala.toLowerCase().includes(searchQuery.sala.toLowerCase())) &&
      (searchQuery.armario === "" ||
        item.armario
          .toLowerCase()
          .includes(searchQuery.armario.toLowerCase())) &&
      (searchQuery.nome_projeto === "" ||
        item.nome_projeto
          .toLowerCase()
          .includes(searchQuery.nome_projeto.toLowerCase()))
    );
  });

  // Lógica de Paginação
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProdutos.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredProdutos.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja deletar este item?")) {
      try {
        await Produto.delete(id); // Deletando o produto
        setProdutos(produtos.filter((item) => item.id !== id)); // Atualizando o estado
        alert("Item deletado com sucesso!");
      } catch (error) {
        console.error("Erro ao deletar item:", error);
      }
    }
  };

  const handleUpdate = (item) => {
    setIsEditing(true);
    setCurrentItem(item);
    setUpdatedData({
      nome: item.nome,
      quantidade: item.quantidade,
      tipo_unitario: item.tipo_unitario,
      andar: item.andar,
      sala: item.sala,
      armario: item.armario,
      nome_projeto: item.nome_projeto,
    });
  };

  const handleSaveUpdate = async () => {
    try {
      await Produto.update(currentItem.id, updatedData); // Atualizando o produto
      setProdutos(
        produtos.map((item) =>
          item.id === currentItem.id ? { ...item, ...updatedData } : item
        )
      ); // Atualizando o estado
      alert("Item atualizado com sucesso!");
      setIsEditing(false);
      setCurrentItem(null);
      setUpdatedData({});
    } catch (error) {
      console.error("Erro ao atualizar item:", error);
    }
  };

  return (
    <div className="estoque-container">
      <h1 className="estoque-title">Estoque</h1>

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
      </div>

      {isEditing && (
        <div className="edit-container">
          <h2>Atualizar Item</h2>
          {Object.keys(updatedData).map((key) => (
            <input
              key={key}
              type="text"
              placeholder={key}
              value={updatedData[key]}
              onChange={(e) =>
                setUpdatedData({ ...updatedData, [key]: e.target.value })
              }
            />
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
                <td className="table-data">{item.nome_projeto || "N/A"}</td>
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
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        <span>
          Página {currentPage} de {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Próxima
        </button>
      </div>

      <button className="back-button" onClick={handleBackClick}>
        Voltar
      </button>
    </div>
  );
}

export default EstoquePage;
