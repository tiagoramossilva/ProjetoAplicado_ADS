// No seu authService.js
export const login = async (email, password) => {
  const response = await fetch("http://localhost:3001/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();
  
  if (response.ok) {
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user)); // Armazena os dados do usuário
    return data;
  }
  
  throw new Error(data.error || "Erro ao fazer login");
};