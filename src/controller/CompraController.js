const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const CompraController = {
  async create(req, res) {
    const {
      data_compra,
      data_emissao,
      data_envio,
      valor_total,
    } = req.body;
    
    try {
      const compra = await prisma.compra.create({
        data: {
          data_compra,
          data_emissao,
          data_envio,
          valor_total,
        },
      });
      return res.status(201).json(compra);
    } catch (error) {
      console.error("Erro ao criar compra:", error.message || error);
      return res.status(500).json({ error: "Erro ao criar compra", detalhes: error.message });
    }
  },

  async getAll(req, res) {
    try {
      const compras = await prisma.compra.findMany();
      return res.json(compras);
    } catch (error) {
      console.error("Erro ao buscar compras:", error);
      return res.status(500).json({ error: "Erro ao buscar compras" });
    }
  },

  async getById(req, res) {
    const { id } = req.params;
    try {
      const compra = await prisma.compra.findUnique({
        where: { id: Number(id) },
      });
      if (!compra) {
        return res.status(404).json({ error: "Compra não encontrada" });
      }
      return res.json(compra);
    } catch (error) {
      console.error("Erro ao buscar compra:", error);
      return res.status(500).json({ error: "Erro ao buscar compra" });
    }
  },

  async update(req, res) {
    const { id } = req.params;
    const {
      data_compra,
      data_emissao,
      data_envio,
      valor_total,
    } = req.body;

    try {
      const compra = await prisma.compra.update({
        where: { id: Number(id) },
        data: {
          data_compra,
          data_emissao,
          data_envio,
          valor_total,
        },
      });
      return res.json(compra);
    } catch (error) {
      console.error("Erro ao atualizar compra:", error);
      return res.status(500).json({ error: "Erro ao atualizar compra", detalhes: error.message });
    }
  },

  async delete(req, res) {
    const { id } = req.params;
    try {
      await prisma.compra.delete({
        where: { id: Number(id) },
      });
      return res.status(204).send();
    } catch (error) {
      console.error("Erro ao deletar compra:", error);
      return res.status(500).json({ error: "Erro ao deletar compra" });
    }
  },
};

module.exports = CompraController;
