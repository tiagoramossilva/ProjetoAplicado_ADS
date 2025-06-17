import React, { useState } from "react";
import "../Cadastro/Cadastro.css"


export const EditModal = ({
  isEditing,
  setIsEditing,
  currentItem,
  updatedData,
  setUpdatedData,
  onSave,
}) => {
  const [message, setMessage] = useState("");

  if (!isEditing) return null;

  const handleSave = () => {
    const camposObrigatorios = ["nome", "quantidade", "tipo_unitario"];
    const faltando = camposObrigatorios.find(
      (campo) => !updatedData[campo]?.toString().trim()
    );

    if (faltando) {
      setMessage(`Preencha o campo obrigatório: ${faltando}`);
      return;
    }

    setMessage("");
    onSave(updatedData);
  };

  return (
    <div className="cadastro-container">
      <div className="cadastro-box">
        <button className="cadastro-close-btn" onClick={() => setIsEditing(false)}>×</button>
        <h2 className="cadastro-title">Atualizar Produto</h2>

        {message && <div className="cadastro-error-message">{message}</div>}

        <form className="cadastro-form" onSubmit={(e) => e.preventDefault()}>
          {Object.entries(updatedData).map(([field, value]) => (
            <div className="input-container" key={field}>
              <input
                className="InputLogin"
                type={field === "quantidade" ? "number" : "text"}
                name={field}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={value || ""}
                onChange={(e) =>
                  setUpdatedData({ ...updatedData, [field]: e.target.value })
                }
                required={["nome", "quantidade", "tipo_unitario"].includes(field)}
              />
            </div>
          ))}
          <button className="cadastro-btn" type="submit" onClick={handleSave}>
            SALVAR
          </button>
        </form>
      </div>
    </div>
  );
};
