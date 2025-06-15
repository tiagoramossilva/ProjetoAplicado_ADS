import React from "react";
import { validateProduto, sanitizeProdutoData } from "../../services/validation";
import "./EditModal.css";

export const EditModal = ({
  isEditing,
  setIsEditing,
  currentItem,
  updatedData,
  setUpdatedData,
  onSave,
}) => {
  if (!isEditing) return null;

  const handleSave = () => {
    const sanitizedData = sanitizeProdutoData(updatedData);
    if (!validateProduto(sanitizedData)) return;
    onSave(sanitizedData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-title">Atualizar Item</h2>
        <div className="modal-form">
          {Object.entries(updatedData).map(([field, value]) => (
            <div className="form-group" key={field}>
              <label htmlFor={field} className="form-label">
                {field}:
              </label>
              <input
                type={field === "quantidade" ? "number" : "text"}
                id={field}
                name={field}
                className="form-input"
                value={value || ""}
                onChange={(e) =>
                  setUpdatedData({ ...updatedData, [field]: e.target.value })
                }
              />
            </div>
          ))}
        </div>
        <div className="modal-actions">
          <button onClick={handleSave} className="modal-button save-button">
            Salvar
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="modal-button cancel-button"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};