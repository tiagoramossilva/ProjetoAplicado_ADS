import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Estoque.css';
import { FiRefreshCcw } from "react-icons/fi";
import { IoTrashBin, IoSearchOutline } from "react-icons/io5";
import Estoque from '../../models/Estoque'; // Altere para o caminho correto
import LocalArmazenamento from '../../models/LocalArmazenamento'; // Altere para o caminho correto
import Projeto from '../../models/Projeto'; // Altere para o caminho correto
import Produto from '../../models/Produto'; // Altere para o caminho correto

function EstoquePage() {
    const navigate = useNavigate();
    const [estoques, setEstoques] = useState([]);
    const [locaisArmazenamento, setLocaisArmazenamento] = useState([]);
    const [projetos, setProjetos] = useState([]);
    const [produtos, setProdutos] = useState([]);
    
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(12); // Número de itens por página

    // Estado para o modal de atualização
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);

    const handleBackClick = () => {
        navigate('/home');
    };

    const handleCadastrarArmazenamentoClick = () => {
        navigate('/cadastrar-armazenamento');
    };

    // Funções para buscar dados
    const fetchData = async () => {
        try {
            const [estoquesData, locaisArmazenamentoData, projetosData, produtosData] = await Promise.all([
                Estoque.getAll(),
                LocalArmazenamento.getAll(),
                Projeto.getAll(),
                Produto.getAll(),
            ]);
            setEstoques(estoquesData);
            setLocaisArmazenamento(locaisArmazenamentoData);
            setProjetos(projetosData);
            setProdutos(produtosData);
        } catch (error) {
            console.error('Erro ao buscar dados:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Lógica para paginar os estoques
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = estoques.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(estoques.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Função para deletar um item
    const handleDelete = async (id) => {
        if (window.confirm("Tem certeza que deseja deletar este item?")) {
            try {
                await Estoque.delete(id);
                setEstoques(estoques.filter(item => item.id !== id));
                alert("Item deletado com sucesso!");
            } catch (error) {
                console.error('Erro ao deletar item:', error);
            }
        }
    };

    // Função para abrir o modal de atualização
    const handleUpdate = (item) => {
        setCurrentItem(item);
        setIsUpdateModalOpen(true);
    };

    // Função para enviar as atualizações
    const handleUpdateSubmit = async (updatedItem) => {
        try {
            await Estoque.update(updatedItem.id, updatedItem);
            setEstoques(estoques.map(item => item.id === updatedItem.id ? updatedItem : item));
            alert("Item atualizado com sucesso!");
            setIsUpdateModalOpen(false);
            setCurrentItem(null);
        } catch (error) {
            console.error('Erro ao atualizar item:', error);
        }
    };

    return (
        <div className="estoque-container">
            <h1 className="estoque-title">Estoque</h1>

            <div className="search-bar">
                <input className="search-input" type="text" placeholder="Item" />
                <button className="search-button">
                    <IoSearchOutline className='iconSearch' />
                </button>
                <input className="search-input" type="text" placeholder="Andar" />
                <button className="search-button">
                    <IoSearchOutline className='iconSearch' />
                </button>
                <input className="search-input" type="text" placeholder="Sala" />
                <button className="search-button">
                    <IoSearchOutline className='iconSearch' />
                </button>
                <input className="search-input" type="text" placeholder="Armário" />
                <button className="search-button">
                    <IoSearchOutline className='iconSearch' />
                </button>
                <input className="search-input" type="text" placeholder="Projeto" />
            </div>

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
                    {currentItems.map((item) => {
                        const produto = produtos.find(prod => prod.id === item.produtoId);
                        const local = locaisArmazenamento.find(loc => loc.id === item.localId);
                        const projeto = projetos.find(proj => proj.id === item.projetoId);

                        return (
                            <tr className="table-row" key={item.id}>
                                <td className="table-data">{produto ? produto.nome : 'N/A'}</td>
                                <td className="table-data">{item.quantidade}</td>
                                <td className="table-data">{item.tipo_unitario}</td>
                                <td className="table-data">{local ? local.andar : 'N/A'}</td>
                                <td className="table-data">{local ? local.sala : 'N/A'}</td>
                                <td className="table-data">{local ? local.armario : 'N/A'}</td>
                                <td className="table-data">{projeto ? projeto.nome_projeto : 'N/A'}</td>
                                <td className="table-actions">
                                    <button className="action-button update-button" onClick={() => handleUpdate(item)}>
                                        <FiRefreshCcw />
                                    </button>
                                    <button className="action-button delete-button" onClick={() => handleDelete(item.id)}>
                                        <IoTrashBin />
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            <div className="pagination">
                {[...Array(totalPages)].map((_, index) => (
                    <button
                        key={index}
                        className={`pagination-button ${currentPage === index + 1 ? 'active' : ''}`}
                        onClick={() => handlePageChange(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>

            <div className="button-container">
                <button className="estoque-button" onClick={handleCadastrarArmazenamentoClick}>Cadastrar local de armazenamento</button>
                <button className="estoque-button">Cadastrar Item</button>
                <button className="estoque-button" onClick={handleBackClick}>Voltar</button>
            </div>

            {/* Modal de Atualização */}
            {isUpdateModalOpen && (
                <div className="update-modal">
                    <h2>Atualizar Item</h2>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        handleUpdateSubmit(currentItem); // Envie os dados atualizados
                    }}>
                        <label>
                            Quantidade:
                            <input type="number" value={currentItem.quantidade} onChange={(e) => setCurrentItem({ ...currentItem, quantidade: e.target.value })} />
                        </label>
                        <label>
                            Tipo Unitário:
                            <input type="text" value={currentItem.tipo_unitario} onChange={(e) => setCurrentItem({ ...currentItem, tipo_unitario: e.target.value })} />
                        </label>
                        {/* Adicione mais campos conforme necessário */}
                        <button type="submit">Salvar</button>
                        <button type="button" onClick={() => setIsUpdateModalOpen(false)}>Fechar</button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default EstoquePage;
