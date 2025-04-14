import React, { useState, useEffect } from "react";
import "./Configuracoes.css"; // Reutiliza o estilo do cadastro
import Navigation from "../Navigation/Navigation";

function ConfiguracoesUsuario() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    funcao: "",
    usuario: "",
    senha: "",
    admin: false,
  });
  const [message, setMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false); // Controle de edição do perfil
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    async function carregarDadosUsuario() {
      try {
        const response = await fetch("http://localhost:3000/api/usuarios/1"); // Supondo que o ID seja 1
        const dados = await response.json();
        setFormData(dados);
        setUserId(dados.id); // Armazenando o ID do usuário
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
        setMessage("Erro ao carregar dados do usuário.");
      }
    }

    carregarDadosUsuario();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/api/usuarios/${userId}`, { // Usando o ID do usuário na URL
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage("Informações atualizadas com sucesso!");
      } else {
        setMessage("Erro ao atualizar. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      setMessage("Erro na requisição.");
    }
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <>
      <Navigation />
      <div className="profile-container">
        <h2 className="profile-title">Perfil do Usuário</h2>
        <div className="profile-card">
          <div className="profile-avatar-section">
            <div className="avatar">
              <img src="https://via.placeholder.com/100" alt="Avatar" />
              <button className="camera-btn">📷</button>
            </div>
            <div className="upload-boxes">
              <div className="upload-box">LOGO</div>
              <div className="upload-box">VENDOR<br />DOCUMENTS</div>
            </div>
          </div>
          <div className="profile-info">
            {isEditing ? (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Nome:</label>
                  <input
                    type="text"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email:</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Função:</label>
                  <input
                    type="text"
                    name="funcao"
                    value={formData.funcao}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Usuário:</label>
                  <input
                    type="text"
                    name="usuario"
                    value={formData.usuario}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Senha:</label>
                  <input
                    type="password"
                    name="senha"
                    value={formData.senha}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Administrador:</label>
                  <input
                    type="checkbox"
                    name="admin"
                    checked={formData.admin}
                    onChange={handleChange}
                  />
                </div>
                <button type="submit" className="submit-btn">
                  Salvar Alterações
                </button>
              </form>
            ) : (
              <>
                <p><strong>Nome:</strong> {formData.nome}</p>
                <p><strong>Email:</strong> {formData.email}</p>
                <p><strong>Função:</strong> {formData.funcao}</p>
                <p><strong>Usuário:</strong> {formData.usuario}</p>
                <p><strong>Administrador:</strong> {formData.admin ? "Sim" : "Não"}</p>
                <button className="edit-btn" onClick={toggleEdit}>
                  ✏️ Editar Perfil
                </button>
              </>
            )}
          </div>
        </div>
        {message && <p className="message">{message}</p>}
      </div>
    </>
  );
}

export default ConfiguracoesUsuario;
