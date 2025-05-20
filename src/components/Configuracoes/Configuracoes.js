import React, { useState, useEffect } from "react";
import "./Configuracoes.css";
import Navigation from "../Navigation/Navigation";
import { useNavigate } from "react-router-dom";

function ConfiguracoesUsuario() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    funcao: "",
    usuario: "",
    senha: "",
    admin: false
  });
  const [message, setMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleUserClick = () => {
    navigate("/usuarios");
  };

  useEffect(() => {
    const carregarDadosUsuario = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem('user'));
        if (!userData?.id) throw new Error("Usuário não autenticado");

        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:3001/api/usuarios/${userData.id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) throw new Error("Erro ao carregar dados");

        const dados = await response.json();
        setFormData(dados);
      } catch (error) {
        console.error("Erro:", error);
        setMessage(error.message);
      } finally {
        setLoading(false);
      }
    };

    carregarDadosUsuario();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const userData = JSON.parse(localStorage.getItem('user'));

      const response = await fetch(`http://localhost:3001/api/usuarios/${userData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Perfil atualizado com sucesso!");
        setIsEditing(false);
        localStorage.setItem('user', JSON.stringify({ ...userData, ...formData }));
      } else {
        throw new Error(data.error || "Erro ao atualizar perfil");
      }
    } catch (error) {
      console.error("Erro:", error);
      setMessage(error.message);
    }
  };

  const toggleEdit = () => {
    setIsEditing(prev => !prev);
    setMessage("");
  };

  if (loading) {
    return (
      <>
        <Navigation />
        <div className="profile-container">
          <p>Carregando seus dados...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navigation />
      <div className="profile-container">
        <h2>Configurações do Usuário</h2>

        {message && (
          <div className={`alert ${message.includes("sucesso") ? "success" : "error"}`}>
            {message}
          </div>
        )}

        <div className="profile-card">
          <div className="profile-header">
            <h3>Meu Perfil</h3>
            {!isEditing && (
              <button className="edit-button" onClick={toggleEdit}>
                Editar Perfil
              </button>
            )}
          </div>

          {isEditing ? (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Nome Completo</label>
                <input
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Função</label>
                <input
                  type="text"
                  name="funcao"
                  value={formData.funcao}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Nome de Usuário</label>
                <input
                  type="text"
                  name="usuario"
                  value={formData.usuario}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Nova Senha (deixe em branco para manter)</label>
                <input
                  type="password"
                  name="senha"
                  value={formData.senha}
                  onChange={handleChange}
                  placeholder="••••••••"
                />
              </div>

              <div className="form-actions">
                <button type="submit" className="save-button">
                  Salvar Alterações
                </button>
                <button 
                  type="button" 
                  className="cancel-button"
                  onClick={toggleEdit}
                >
                  Cancelar
                </button>
              </div>
            </form>
          ) : (
            <div className="profile-view">
              <div className="profile-field">
                <span className="field-label">Nome:</span>
                <span className="field-value">{formData.nome}</span>
              </div>

              <div className="profile-field">
                <span className="field-label">Email:</span>
                <span className="field-value">{formData.email}</span>
              </div>

              <div className="profile-field">
                <span className="field-label">Função:</span>
                <span className="field-value">{formData.funcao || "-"}</span>
              </div>

              <div className="profile-field">
                <span className="field-label">Usuário:</span>
                <span className="field-value">{formData.usuario}</span>
              </div>

              <div className="profile-field">
                <span className="field-label">Tipo:</span>
                <span className="field-value">
                  {formData.admin ? "Administrador" : "Usuário Padrão"}
                </span>
              </div>
            </div>
          )}
        </div>
        <div className="config-actions-bottom">
          <button className="secondary-button" onClick={handleUserClick}>
            Usuários
          </button>
          <button className="secondary-button logout-button" onClick={handleLogout}>
            Sair
          </button>
        </div>

      </div>
    </>
  );
}

export default ConfiguracoesUsuario;
