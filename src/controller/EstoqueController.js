const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const estoqueController = {
  create: async (req, res) => {
    try {
      const { quantidade, tipo_unitario, produto_id, projeto_id, local_armazenamento_id } = req.body;
      const novoEstoque = await prisma.estoque.create({
        data: {
          quantidade,
          tipo_unitario,
          produto: { connect: { id: produto_id } },
          projeto: { connect: { id: projeto_id } },
          local_armazenamento: { connect: { id: local_armazenamento_id } },
        },
      });
      res.status(201).json(novoEstoque);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar estoque' });
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
      res.status(500).json({ error: 'Erro ao buscar estoque' });
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { quantidade, tipo_unitario, produto_id, projeto_id, local_armazenamento_id } = req.body;
      const estoqueAtualizado = await prisma.estoque.update({
        where: { id: Number(id) },
        data: {
          quantidade,
          tipo_unitario,
          produto: { connect: { id: produto_id } },
          projeto: { connect: { id: projeto_id } },
          local_armazenamento: { connect: { id: local_armazenamento_id } },
        },
      });
      res.status(200).json(estoqueAtualizado);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar estoque' });
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params;
      await prisma.estoque.delete({ where: { id: Number(id) } });
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar estoque' });
    }
  },
};

module.exports = estoqueController;
