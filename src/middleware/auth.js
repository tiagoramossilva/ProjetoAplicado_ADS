// auth.js
const jwt = require("jsonwebtoken");

// Middleware básico de autenticação
const auth = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Token não fornecido" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Adiciona user à requisição
    next();
  } catch (err) {
    res.status(401).json({ error: "Token inválido" });
  }
};

// Middleware separado para verificar admin
const isAdmin = (req, res, next) => {
  if (!req.user?.admin) {
    return res.status(403).json({ error: "Acesso requer admin" });
  }
  next();
};

module.exports = { auth, isAdmin };
