import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import './UsuariosAdmin.css'; // Usaremos o mesmo CSS do HistoricoCompras

function UsuariosAdmin() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const itemsPerPage = 10;

  const navigate = useNavigate();

  // Verifica se o usuário é admin
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user.admin) {
      navigate('/'); // Redireciona se não for admin
    }
  }, [navigate]);

  // Carrega os usuários
  useEffect(() => {
    const carregarUsuarios = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3001/api/usuarios', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) throw new Error('Erro ao carregar usuários');

        const data = await response.json();
        setUsuarios(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    carregarUsuarios();
  }, []);

  // Filtra usuários pela pesquisa
  const filteredUsuarios = usuarios.filter(usuario =>
    Object.values(usuario).some(
      value => value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    ));

  // Paginação
  const totalPages = Math.ceil(filteredUsuarios.length / itemsPerPage);
  const paginatedUsuarios = filteredUsuarios.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Manipuladores de edição
  const iniciarEdicao = (usuario) => {
    setEditingId(usuario.id);
    setEditForm({ ...usuario });
  };

  const cancelarEdicao = () => {
    setEditingId(null);
    setEditForm({});
  };

  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const salvarEdicao = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3001/api/usuarios/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(editForm)
      });

      if (!response.ok) throw new Error('Erro ao atualizar usuário');

      setUsuarios(usuarios.map(u => u.id === id ? { ...u, ...editForm } : u));
      setEditingId(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const deletarUsuario = async (id) => {
    if (!window.confirm('Tem certeza que deseja deletar este usuário?')) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3001/api/usuarios/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error('Erro ao deletar usuário');

      setUsuarios(usuarios.filter(u => u.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className="historico-container">Carregando...</div>;
  if (error) return <div className="historico-container">Erro: {error}</div>;

  return (
    <>
      <Navigation />
      <div className="historico-container">
        <div className="containertitle">
          <h1>Administração de Usuários</h1>
        </div>

        <div className="search-bar">
          <input
            type="text"
            className="search-input"
            placeholder="Pesquisar usuários..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <table className="historico-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Usuário</th>
              <th>Admin</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsuarios.length > 0 ? (
              paginatedUsuarios.map(usuario => (
                <tr key={usuario.id}>
                  <td>{usuario.id}</td>
                  <td>
                    {editingId === usuario.id ? (
                      <input
                        type="text"
                        name="nome"
                        value={editForm.nome || ''}
                        onChange={handleEditChange}
                      />
                    ) : (
                      usuario.nome
                    )}
                  </td>
                  <td>
                    {editingId === usuario.id ? (
                      <input
                        type="email"
                        name="email"
                        value={editForm.email || ''}
                        onChange={handleEditChange}
                      />
                    ) : (
                      usuario.email
                    )}
                  </td>
                  <td>
                    {editingId === usuario.id ? (
                      <input
                        type="text"
                        name="usuario"
                        value={editForm.usuario || ''}
                        onChange={handleEditChange}
                      />
                    ) : (
                      usuario.usuario
                    )}
                  </td>
                  <td>
                    {editingId === usuario.id ? (
                      <input
                        type="checkbox"
                        name="admin"
                        checked={editForm.admin || false}
                        onChange={handleEditChange}
                      />
                    ) : (
                      usuario.admin ? 'Sim' : 'Não'
                    )}
                  </td>
                  <td>
                    <div className="table-actions">
                      {editingId === usuario.id ? (
                        <>
                          <button 
                            className="action-button edit-button"
                            onClick={() => salvarEdicao(usuario.id)}
                          >
                            ✔️
                          </button>
                          <button 
                            className="action-button delete-button"
                            onClick={cancelarEdicao}
                          >
                            ❌
                          </button>
                        </>
                      ) : (
                        <>
                          <button 
                            className="action-button edit-button"
                            onClick={() => iniciarEdicao(usuario)}
                          >
                            ✏️
                          </button>
                          <button 
                            className="action-button delete-button"
                            onClick={() => deletarUsuario(usuario.id)}
                          >
                            🗑️
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="no-data">
                  Nenhum usuário encontrado
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {paginatedUsuarios.length > 0 && (
          <div className="pagination">
            <button
              className="buttonsPagination"
              onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
            >
              Anterior
            </button>
            <span>Página {currentPage} de {totalPages}</span>
            <button
              className="buttonsPagination"
              onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Próxima
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default UsuariosAdmin;