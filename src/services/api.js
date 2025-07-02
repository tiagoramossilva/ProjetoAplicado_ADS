const API_BASE_URL = "http://localhost:3001/api";

export const fetchProdutos = async () => {
  const response = await fetch(`${API_BASE_URL}/produto-com-projeto`);
  if (!response.ok) throw new Error("Erro ao buscar produtos");
  const data = await response.json();
  return data;
};

export const deleteProduto = async (id) => {
  const token = localStorage.getItem("token"); // ou como você estiver armazenando

  const response = await fetch(`${API_BASE_URL}/produto/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) throw new Error("Erro ao deletar produto");
  return true;
};

export const updateProduto = async (id, data) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_BASE_URL}/produto/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) throw new Error("Erro ao atualizar produto");
  console.log(data);
  return await response.json();
};
