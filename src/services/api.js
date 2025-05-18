const API_BASE_URL = "http://localhost:3001/api";

export const fetchProdutos = async () => {
  const response = await fetch(`${API_BASE_URL}/produto-com-projeto`);
  if (!response.ok) throw new Error("Erro ao buscar produtos");
  const data = await response.json();
  return data;
};

export const deleteProduto = async (id) => {
  const response = await fetch(`${API_BASE_URL}/produto/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Erro ao deletar produto");
  return true;
};

export const updateProduto = async (id, data) => {
  const response = await fetch(`${API_BASE_URL}/produto/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Erro ao atualizar produto");
  return await response.json();
};