export const safeGet = (obj, path, defaultValue = "N/A") => {
    return path.split(".").reduce((acc, key) => {
      if (acc === null || acc === undefined) return defaultValue;
      return acc[key] ?? defaultValue;
    }, obj);
  };
  
  export const filterProdutos = (produtos, searchQuery) => {
    return produtos.filter((item) => {
      return Object.entries(searchQuery).every(([key, value]) => {
        if (!value) return true; // Ignora se o campo de busca estiver vazio
  
        let itemValue;
        if (key === "nome_projeto") {
          itemValue = safeGet(item, "compras.0.projeto.nome_projeto");
        } else {
          itemValue = item[key];
        }
  
        return String(itemValue).toLowerCase().includes(value.toLowerCase());
      });
    });
  };