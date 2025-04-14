export const login = async (email, password) => {
    const response = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
  
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Erro desconhecido.");
    }
  
    return response.json();
  };
  