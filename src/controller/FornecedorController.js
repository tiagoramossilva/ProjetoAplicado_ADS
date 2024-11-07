const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const fornecedorController = {
  // Método original que cria um fornecedor (sem transação)
  create: async (req, res) => {
    try {
      const {
        razao_social_fornecedor,
        CEP,
        CNPJ,
        UF,
        bairro,
        endereco,
        inscricao_estadual,
        municipio,
        telefone,
      } = req.body;

      const novoFornecedor = await prisma.fornecedor.create({
        data: {
          razao_social_fornecedor,
          CEP,
          CNPJ,
          UF,
          bairro,
          endereco,
          inscricao_estadual,
          municipio,
          telefone,
        },
      });

      res.status(201).json(novoFornecedor);
    } catch (error) {
      res.status(500).json({ error: "Erro ao criar fornecedor" });
    }
  },

  // Novo método para criar o fornecedor dentro de uma transação
  createWithTransaction: async (fornecedorData, prisma) => {
    try {
      const novoFornecedor = await prisma.fornecedor.create({
        data: fornecedorData,
      });
      return novoFornecedor;
    } catch (error) {
      console.error("Erro ao criar fornecedor:", error);
      throw new Error("Erro ao criar fornecedor dentro da transação");
    }
  },

  getAll: async (req, res) => {
    try {
      const fornecedores = await prisma.fornecedor.findMany({
        include: {
          razao_social_fornecedor: true,
          compras: true,
        },
      });
      res.status(200).json(fornecedores);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar fornecedores" });
    }
  },

  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const fornecedor = await prisma.fornecedor.findUnique({
        where: { id: Number(id) },
        include: {
          razao_social_fornecedor: true,
          compras: true,
        },
      });

      if (!fornecedor)
        return res.status(404).json({ error: "Fornecedor não encontrado" });

      res.status(200).json(fornecedor);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar fornecedor" });
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const {
        razao_social_fornecedor,
        CEP,
        CNPJ,
        UF,
        bairro,
        endereco,
        inscricao_estadual,
        municipio,
        telefone,
      } = req.body;

      const fornecedorAtualizado = await prisma.fornecedor.update({
        where: { id: Number(id) },
        data: {
          razao_social_fornecedor,
          CEP,
          CNPJ,
          UF,
          bairro,
          endereco,
          inscricao_estadual,
          municipio,
          telefone,
        },
      });

      res.status(200).json(fornecedorAtualizado);
    } catch (error) {
      res.status(500).json({ error: "Erro ao atualizar fornecedor" });
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params;
      await prisma.fornecedor.delete({ where: { id: Number(id) } });
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Erro ao deletar fornecedor" });
    }
  },
};

module.exports = fornecedorController;
