const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const estoqueController = {
  create: async (req, res) => {
    try {
      const { quantidade, tipo_unitario, produtoData, projetoData, localArmazenamentoData } = req.body;

      const novoEstoque = await prisma.estoque.create({
        data: {
          quantidade,
          tipo_unitario,
          produto: produtoData ? { create: produtoData } : undefined,
          projeto: projetoData ? { create: projetoData } : undefined,
          local_armazenamento: localArmazenamentoData ? { create: localArmazenamentoData } : undefined,
        },
      });
      res.status(201).json(novoEstoque);
    } catch (error) {
      console.error("Erro ao criar estoque:", error.message || error);
      res.status(500).json({ error: 'Erro ao criar estoque', detalhes: error.message });
    }
  },

  getAll: async (req, res) => {
    try {
      const estoques = await prisma.estoque.findMany({
        include: {
          produto: true,
          projeto: true,
          local_armazenamento: true,
        },
      });
      res.status(200).json(estoques);
    } catch (error) {
      console.error("Erro ao buscar estoques:", error);
      res.status(500).json({ error: 'Erro ao buscar estoques' });
    }
  },

  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const estoque = await prisma.estoque.findUnique({
        where: { id: Number(id) },
        include: {
          produto: true,
          projeto: true,
          local_armazenamento: true,
        },
      });
      if (!estoque) return res.status(404).json({ error: 'Estoque não encontrado' });
      res.status(200).json(estoque);
    } catch (error) {
      console.error("Erro ao buscar estoque:", error);
      res.status(500).json({ error: 'Erro ao buscar estoque' });
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { quantidade, tipo_unitario, produtoData, projetoData, localArmazenamentoData } = req.body;

      const estoqueAtualizado = await prisma.estoque.update({
        where: { id: Number(id) },
        data: {
          quantidade,
          tipo_unitario,
          produto: produtoData ? { create: produtoData } : undefined,
          projeto: projetoData ? { create: projetoData } : undefined,
          local_armazenamento: localArmazenamentoData ? { create: localArmazenamentoData } : undefined,
        },
      });
      res.status(200).json(estoqueAtualizado);
    } catch (error) {
      console.error("Erro ao atualizar estoque:", error.message || error);
      res.status(500).json({ error: 'Erro ao atualizar estoque', detalhes: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params;
      await prisma.estoque.delete({ where: { id: Number(id) } });
      res.status(204).send();
    } catch (error) {
      console.error("Erro ao deletar estoque:", error);
      res.status(500).json({ error: 'Erro ao deletar estoque' });
    }
  },
};

module.exports = estoqueController;
