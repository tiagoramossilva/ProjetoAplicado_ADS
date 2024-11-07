const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const AdicionaisController = {
  // Método original para criar um adicional (sem transação)
  async createAdicional(req, res) {
    const { observacoes } = req.body;

    try {
      const adicional = await prisma.adicionais.create({
        data: {
          observacoes,
        },
      });

      return res.status(201).json(adicional);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao criar adicional" });
    }
  },

  // Novo método para criar um adicional dentro de uma transação
  async createWithTransaction(adicionalData, prisma) {
    try {
      const adicional = await prisma.adicionais.create({
        data: adicionalData, // Usamos os dados recebidos como parâmetro
      });
      return adicional; // Retorna o adicional criado
    } catch (error) {
      throw new Error("Erro ao criar adicional dentro da transação");
    }
  },
};

module.exports = AdicionaisController;
