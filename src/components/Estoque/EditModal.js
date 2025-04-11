import React from "react";
import { validateProduto, sanitizeProdutoData } from "../../services/validation";

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
    <div className="edit-container">
      <h2>Atualizar Item</h2>
      {Object.entries(updatedData).map(([field, value]) => (
        <div key={field}>
          <label htmlFor={field}>{field}:</label>
          <input
            type={field === "quantidade" ? "number" : "text"}
            id={field}
            name={field}
            value={value || ""}
            onChange={(e) =>
              setUpdatedData({ ...updatedData, [field]: e.target.value })
            }
          />
        </div>
      ))}
      <button onClick={handleSave}>Salvar</button>
      <button onClick={() => setIsEditing(false)}>Cancelar</button>
    </div>
  );
};