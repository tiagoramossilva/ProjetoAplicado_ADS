const { PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const prisma = new PrismaClient();

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Verifica se o usuário existe
    const user = await prisma.usuario.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({ error: "Usuário não encontrado" });
    }

    // Verifica a senha
    if (user.senha !== password) {
      return res.status(401).json({ error: "Senha incorreta" });
    }

    // Gera um token JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, admin: user.admin },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ token, user });
  } catch (error) {
    console.error("Erro ao realizar login:", error);
    res.status(500).json({ error: "Erro ao realizar login" });
  }
};


module.exports = { loginUser };
