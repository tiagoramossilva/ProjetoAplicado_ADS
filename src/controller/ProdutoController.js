const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const produtoController = {
  // Método original para criar um produto (sem transação)
  create: async (req, res) => {
    try {
      const { nome, numero_serie, fabricante, descricao, tipo_unitario, quantidade, andar, sala, armario } = req.body;
      const produtoCriado = await prisma.produto.create({
        data: { nome, numero_serie, fabricante, descricao, tipo_unitario, quantidade, andar, sala, armario },
      });
      res.status(201).json(produtoCriado);
    } catch (error) {
      res.status(500).json({ error: "Erro ao criar produto" });
    }
  },

  // Método para criar um produto dentro de uma transação simplificada
  async createWithTransaction(produtoData) {
    try {
      const transaction = await prisma.$transaction(async (prisma) => {
        console.log("Iniciando criação do produto...");
        const produtoCriado = await prisma.produto.create({
          data: produtoData,
        });
        console.log("Produto criado:", produtoCriado);
        return produtoCriado;
      });
      return transaction;
    } catch (error) {
      console.error("Erro dentro da transação:", error);
      throw new Error("Erro ao criar produto dentro da transação");
    }
  },

  getAll: async (req, res) => {
    try {
      const produtos = await prisma.produto.findMany();
      res.status(200).json(produtos);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar produtos" });
    }
  },

  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const produto = await prisma.produto.findUnique({
        where: { id: Number(id) },
      });
      if (!produto) {
        return res.status(404).json({ error: "Produto não encontrado" });
      }
      res.status(200).json(produto);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar produto" });
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { nome, numero_serie, fabricante, descricao, tipo_unitario, quantidade, andar, sala, armario } = req.body;
      const produtoAtualizado = await prisma.produto.update({
        where: { id: Number(id) },
        data: { nome, numero_serie, fabricante, descricao, tipo_unitario, quantidade, andar, sala, armario },
      });
      res.status(200).json(produtoAtualizado);
    } catch (error) {
      res.status(500).json({ error: "Erro ao atualizar produto" });
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params;
      await prisma.produto.delete({ where: { id: Number(id) } });
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Erro ao deletar produto" });
    }
  },
};

module.exports = produtoController;
