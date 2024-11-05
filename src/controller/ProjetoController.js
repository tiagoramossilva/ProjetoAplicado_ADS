const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const ProjetoController = {
  async createProjeto(req, res) {
    const { nome_projeto, responsavel_tecnico, gerente_projeto, cliente_id } = req.body;
    try {
      const projeto = await prisma.projeto.create({
        data: {
          nome_projeto,
          responsavel_tecnico,
          gerente_projeto,
          cliente: { connect: { id: cliente_id } },
        },
      });
      return res.status(201).json(projeto);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao criar projeto' });
    }
  },

  async getAllProjetos(req, res) {
    try {
      const projetos = await prisma.projeto.findMany();
      return res.json(projetos);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao buscar projetos' });
    }
  },

  async getProjetoById(req, res) {
    const { id } = req.params;
    try {
      const projeto = await prisma.projeto.findUnique({
        where: { id: Number(id) },
      });
      if (!projeto) return res.status(404).json({ error: 'Projeto não encontrado' });
      return res.json(projeto);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao buscar projeto' });
    }
  },

  async updateProjeto(req, res) {
    const { id } = req.params;
    const { nome_projeto, responsavel_tecnico, gerente_projeto, cliente_id } = req.body;
    try {
      const projeto = await prisma.projeto.update({
        where: { id: Number(id) },
        data: {
          nome_projeto,
          responsavel_tecnico,
          gerente_projeto,
          cliente: { connect: { id: cliente_id } },
        },
      });
      return res.json(projeto);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao atualizar projeto' });
    }
  },

  async deleteProjeto(req, res) {
    const { id } = req.params;
    try {
      await prisma.projeto.delete({
        where: { id: Number(id) },
      });
      return res.status(204).send();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao deletar projeto' });
    }
  },
};

module.exports = ProjetoController;
