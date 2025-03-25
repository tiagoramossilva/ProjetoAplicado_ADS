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

  // Simula carregamento dos dados do usuário
  useEffect(() => {
    async function carregarDadosUsuario() {
      try {
        const response = await fetch("http://localhost:3000/api/usuario-logado");
        const dados = await response.json();
        setFormData(dados);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
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
      const response = await fetch("http://localhost:3000/api/atualizar-usuario", {
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

  return (
    <>
    <Navigation />
    <div className="profile-container">
      <h2 className="profile-title">Profile</h2>
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
          <p><strong>Nome:</strong> {formData.nome}</p>
          <p><strong>Email:</strong> {formData.email}</p>
          <p><strong>Telefone:</strong> {formData.telefone}</p>
          <p><strong>Endereço:</strong> {formData.endereco}</p>
          <button className="edit-btn">✏️ Edit Profile</button>
        </div>
      </div>
    </div>
    </>
  );
}

export default ConfiguracoesUsuario;
