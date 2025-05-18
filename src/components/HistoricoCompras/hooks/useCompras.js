import { useState, useEffect, useCallback } from "react";

const useCompras = () => {
  const [compras, setCompras] = useState([]);
  const [filters, setFilters] = useState({
    fornecedor: "",
    dataCompra: "",
    valorMin: "",
    valorMax: ""
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:3001/api/compras-com-relacionamentos");
      if (!response.ok) throw new Error("Erro ao buscar compras");
      const data = await response.json();
      setCompras(data);
    } catch (error) {
      console.error("Erro:", error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
    setCurrentPage(1); // Reset to first page on filter change
  };

  const filteredData = compras.filter(compra => {
    return (
      (!filters.fornecedor || 
       compra.fornecedor?.razao_social_fornecedor?.toLowerCase().includes(filters.fornecedor.toLowerCase())) &&
      (!filters.dataCompra || 
       new Date(compra.data_compra).toLocaleDateString() === new Date(filters.dataCompra).toLocaleDateString()) &&
      (!filters.valorMin || 
       (compra.valor_total && compra.valor_total >= parseFloat(filters.valorMin))) &&
      (!filters.valorMax || 
       (compra.valor_total && compra.valor_total <= parseFloat(filters.valorMax)))
    );
  });

  const handlePageChange = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, Math.ceil(filteredData.length / itemsPerPage))));
  };

  const handleDeleteCompra = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir esta compra?")) {
      try {
        const response = await fetch(`http://localhost:3001/api/compra/${id}`, {
          method: "DELETE"
        });
        if (response.ok) {
          setCompras(compras.filter(c => c.id !== id));
        }
      } catch (error) {
        console.error("Erro ao excluir compra:", error);
      }
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return {
    compras,
    filters,
    currentPage,
    totalPages,
    currentItems,
    handleFilterChange,
    handlePageChange,
    fetchData,
    handleDeleteCompra
  };
};

export default useCompras;