export const validateProduto = (produto) => {
  if (!produto) return false;

  const requiredFields = ["nome", "quantidade", "tipo_unitario"];
  const missingFields = requiredFields.filter((field) => !produto[field]);

  if (missingFields.length > 0) {
    console.error(`Campos obrigatórios faltando: ${missingFields.join(", ")}`);
    return false;
  }

  if (typeof produto.quantidade !== "number" || produto.quantidade < 0) {
    console.error("Quantidade deve ser um número positivo");
    return false;
  }

  return true;
};

export const sanitizeProdutoData = (data) => {
  return {
    nome: String(data.nome || ""),
    quantidade: Number(data.quantidade) || 0,
    tipo_unitario: String(data.tipo_unitario || ""),
    andar: String(data.andar || ""),
    sala: String(data.sala || ""),
    armario: String(data.armario || ""),
  };
};
