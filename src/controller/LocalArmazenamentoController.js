const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const localArmazenamentoController = {
  create: async (req, res) => {
    try {
      const { andar, sala, armario } = req.body;
      const novoLocal = await prisma.localArmazenamento.create({
        data: { andar, sala, armario },
      });
      res.status(201).json(novoLocal);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar local de armazenamento' });
    }
  },

  getAll: async (req, res) => {
    try {
      const locais = await prisma.localArmazenamento.findMany({
        include: {
          estoques: true,
        },
      });
      res.status(200).json(locais);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar locais de armazenamento' });
    }
  },

  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const local = await prisma.localArmazenamento.findUnique({
        where: { id: Number(id) },
        include: {
          estoques: true,
        },
      });
      if (!local) return res.status(404).json({ error: 'Local de armazenamento não encontrado' });
      res.status(200).json(local);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar local de armazenamento' });
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { andar, sala, armario } = req.body;
      const localAtualizado = await prisma.localArmazenamento.update({
        where: { id: Number(id) },
        data: { andar, sala, armario },
      });
      res.status(200).json(localAtualizado);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar local de armazenamento' });
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params;
      await prisma.localArmazenamento.delete({ where: { id: Number(id) } });
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar local de armazenamento' });
    }
  },
};

module.exports = localArmazenamentoController;
