import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Estoque.css';
import { FiRefreshCcw } from "react-icons/fi";
import { IoTrashBin, IoSearchOutline } from "react-icons/io5";
import Estoque from '../../models/Estoque';
import LocalArmazenamento from '../../models/LocalArmazenamento';
import Projeto from '../../models/Projeto';
import Produto from '../../models/Produto';

function EstoquePage() {
    const navigate = useNavigate();
    const [estoques, setEstoques] = useState([]);
    const [locaisArmazenamento, setLocaisArmazenamento] = useState([]);
    const [projetos, setProjetos] = useState([]);
    const [produtos, setProdutos] = useState([]);
    const [combined, setCombined] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(12);
    const [isEditing, setIsEditing] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const [updatedData, setUpdatedData] = useState({}); // Armazena os dados atualizados

    const handleBackClick = () => {
        navigate('/home');
    };

    const handleCadastrarArmazenamentoClick = () => {
        navigate('/cadastrar-armazenamento');
    };

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

            const combinedData = [
                ...estoquesData.map(item => ({ ...item, type: 'estoque' })),
                ...locaisArmazenamentoData.map(item => ({ ...item, type: 'local' })),
                ...projetosData.map(item => ({ ...item, type: 'projeto' })),
                ...produtosData.map(item => ({ ...item, type: 'produto' })),
            ];

            setCombined(combinedData);
        } catch (error) {
            console.error('Erro ao buscar dados:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = combined.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(combined.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Função para deletar um item
    const handleDelete = async (id, type) => {
        if (window.confirm("Tem certeza que deseja deletar este item?")) {
            try {
                if (type === 'estoque') {
                    await Estoque.delete(id);
                    setEstoques(estoques.filter(item => item.id !== id));
                } else if (type === 'local') {
                    await LocalArmazenamento.delete(id);
                    setLocaisArmazenamento(locaisArmazenamento.filter(item => item.id !== id));
                } else if (type === 'projeto') {
                    await Projeto.delete(id);
                    setProjetos(projetos.filter(item => item.id !== id));
                } else if (type === 'produto') {
                    await Produto.delete(id);
                    setProdutos(produtos.filter(item => item.id !== id));
                }

                setCombined(combined.filter(item => item.id !== id || item.type !== type));
                alert("Item deletado com sucesso!");
            } catch (error) {
                console.error('Erro ao deletar item:', error);
            }
        }
    };

    // Função para atualizar um item
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
            if (currentItem.type === 'estoque') {
                await Estoque.update(currentItem.id, updatedData);
                setEstoques(estoques.map(item => (item.id === currentItem.id ? { ...item, ...updatedData } : item)));
            } else if (currentItem.type === 'local') {
                await LocalArmazenamento.update(currentItem.id, updatedData);
                setLocaisArmazenamento(locaisArmazenamento.map(item => (item.id === currentItem.id ? { ...item, ...updatedData } : item)));
            } else if (currentItem.type === 'projeto') {
                await Projeto.update(currentItem.id, updatedData);
                setProjetos(projetos.map(item => (item.id === currentItem.id ? { ...item, ...updatedData } : item)));
            } else if (currentItem.type === 'produto') {
                await Produto.update(currentItem.id, updatedData);
                setProdutos(produtos.map(item => (item.id === currentItem.id ? { ...item, ...updatedData } : item)));
            }

            setCombined(combined.map(item => (item.id === currentItem.id ? { ...item, ...updatedData } : item)));
            alert("Item atualizado com sucesso!");
            setIsEditing(false);
            setCurrentItem(null);
            setUpdatedData({});
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

            {isEditing && (
                <div className="edit-container">
                    <h2>Atualizar Item</h2>
                    {Object.keys(updatedData).map((key) => (
                        <input
                            key={key}
                            type="text"
                            placeholder={key}
                            value={updatedData[key]}
                            onChange={(e) => setUpdatedData({ ...updatedData, [key]: e.target.value })}
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
                    {currentItems.map((item) => (
                        <tr className="table-row" key={`${item.id}-${item.type}`}>
                            <td className="table-data">{item.nome || 'N/A'}</td>
                            <td className="table-data">{item.quantidade || 'N/A'}</td>
                            <td className="table-data">{item.tipo_unitario || 'N/A'}</td>
                            <td className="table-data">{item.andar || 'N/A'}</td>
                            <td className="table-data">{item.sala || 'N/A'}</td>
                            <td className="table-data">{item.armario || 'N/A'}</td>
                            <td className="table-data">{item.nome_projeto || 'N/A'}</td>
                            <td className="table-actions">
                                <button className="action-button update-button" onClick={() => handleUpdate(item)}>
                                    <FiRefreshCcw />
                                </button>
                                <button className="action-button delete-button" onClick={() => handleDelete(item.id, item.type)}>
                                    <IoTrashBin />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="pagination">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => handlePageChange(index + 1)}
                        className={`pagination-button ${currentPage === index + 1 ? 'active' : ''}`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>

            <button className="add-storage-button" onClick={handleCadastrarArmazenamentoClick}>Cadastrar Local de Armazenamento</button>
            <button className="add-item-button" onClick={() => navigate('/cadastrar-item')}>Cadastrar Item</button>
            <button className="back-button" onClick={handleBackClick}>Voltar</button>
        </div>
    );
}

export default EstoquePage;
