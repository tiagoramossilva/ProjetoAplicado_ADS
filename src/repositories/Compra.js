const { PrismaClient } = require("@prisma/client");
const { log } = require("util");
const prisma = new PrismaClient();

const CompraController = {
  // Método original para criar uma compra (sem transação)
  async create(req, res) {
    const { data_compra, data_emissao, data_envio, valor_total } = req.body;

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
      return res
        .status(500)
        .json({ error: "Erro ao criar compra", detalhes: error.message });
    }
  },

  async createWithTransaction(compraData, prisma) {
    try {

      const compra = await prisma.compra.create({
        data: {
          data_compra: new Date(compraData.data_compra),
          data_emissao: new Date(compraData.data_emissao),
          data_envio: new Date(compraData.data_envio),
          valor_total: parseFloat(compraData.valor_total),

          produto: { connect: { id: compraData.produto_id } },
          projeto: compraData.projeto_id
            ? { connect: { id: compraData.projeto_id } }
            : undefined,
          fornecedor: compraData.fornecedor_id
            ? { connect: { id: compraData.fornecedor_id } }
            : undefined,
          cliente: compraData.cliente_id
            ? { connect: { id: compraData.cliente_id } }
            : undefined,
          adicionais: compraData.adicionais_id
            ? { connect: { id: compraData.adicionais_id } }
            : undefined,
        },
      });

      return compra;
    } catch (error) {
      console.error("Erro ao criar compra:", error);
      throw new Error("Erro ao criar compra com transação");
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
    const { data_compra, data_emissao, data_envio, valor_total } = req.body;

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
      return res
        .status(500)
        .json({ error: "Erro ao atualizar compra", detalhes: error.message });
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

  getAllWithRelatedData: async (req, res) => {
    try {
      const compras = await prisma.compra.findMany({
        include: {
          fornecedor: true,
          projeto: true,
        },
      });
      res.status(200).json(compras);
    } catch (error) {
      console.error("Erro ao buscar compras com dados relacionados:", error);
      res.status(500).json({ error: "Erro ao buscar compras" });
    }
  },
};

module.exports = CompraController;
