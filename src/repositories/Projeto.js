const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const ProjetoController = {
  create: async (req, res) => {
    try {
      const { nome_projeto, responsavel_tecnico, gerente_projeto } = req.body;

      const projeto = await prisma.projeto.create({
        data: {
          nome_projeto,
          responsavel_tecnico,
          gerente_projeto,
        },
      });

      res.status(201).json(projeto);
    } catch (error) {
      console.error("Erro ao criar projeto:", error.message || error);
      res
        .status(500)
        .json({ error: "Erro ao criar projeto", detalhes: error.message });
    }
  },

  async createWithTransaction(projetoData, prisma) {
    try {
      const novoProjeto = await prisma.projeto.create({
        data: projetoData, // Usamos os dados recebidos como parâmetro
      });
      return novoProjeto; // Retorna a compra criada
    } catch (error) {
      throw new Error("Erro ao criar compra dentro da transação");
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { nome_projeto, responsavel_tecnico, gerente_projeto } = req.body;

      const projetoAtualizado = await prisma.projeto.update({
        where: { id: Number(id) },
        data: {
          nome_projeto,
          responsavel_tecnico,
          gerente_projeto,
        },
      });

      res.status(200).json(projetoAtualizado);
    } catch (error) {
      console.error("Erro ao atualizar projeto:", error.message || error);
      res
        .status(500)
        .json({ error: "Erro ao atualizar projeto", detalhes: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params;
      await prisma.projeto.delete({ where: { id: Number(id) } });
      res.status(204).send();
    } catch (error) {
      console.error("Erro ao deletar projeto:", error);
      res.status(500).json({ error: "Erro ao deletar projeto" });
    }
  },

  getAll: async (req, res) => {
    try {
      const projetos = await prisma.projeto.findMany();
      res.status(200).json(projetos);
    } catch (error) {
      console.error("Erro ao buscar projetos:", error);
      res.status(500).json({ error: "Erro ao buscar projetos" });
    }
  },

  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const projeto = await prisma.projeto.findUnique({
        where: { id: Number(id) },
      });

      if (!projeto)
        return res.status(404).json({ error: "Projeto não encontrado" });
      res.status(200).json(projeto);
    } catch (error) {
      console.error("Erro ao buscar projeto:", error);
      res.status(500).json({ error: "Erro ao buscar projeto" });
    }
  },
};

module.exports = ProjetoController;
