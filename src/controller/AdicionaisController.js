const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const AdicionaisController = {
  async createAdicional(req, res) {
    const { observacoes } = req.body;

    try {
      const adicional = await prisma.adicionais.create({
        data: {
          observacoes
        },
      });

      return res.status(201).json(adicional);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao criar adicional" });
    }
  },
};

module.exports = AdicionaisController;
