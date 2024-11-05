const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const razaoSocialController = {
  create: async (req, res) => {
    try {
      const {
        CNPJ,
        inscricao_estadual,
        endereco,
        bairro,
        CEP,
        municipio,
        UF,
        telefone,
        clienteId,
        fornecedorId,
      } = req.body;

      const novaRazaoSocial = await prisma.razao_Social.create({
        data: {
          CNPJ,
          inscricao_estadual,
          endereco,
          bairro,
          CEP,
          municipio,
          UF,
          telefone,
          cliente: clienteId ? { connect: { id: clienteId } } : undefined,
          fornecedor: fornecedorId ? { connect: { id: fornecedorId } } : undefined,
        },
      });
      res.status(201).json(novaRazaoSocial);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar razão social' });
    }
  },

  getAll: async (req, res) => {
    try {
      const razoesSociais = await prisma.razao_Social.findMany({
        include: {
          cliente: true,
          fornecedor: true,
        },
      });
      res.status(200).json(razoesSociais);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar razões sociais' });
    }
  },

  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const razaoSocial = await prisma.razao_Social.findUnique({
        where: { id: Number(id) },
        include: {
          cliente: true,
          fornecedor: true,
        },
      });
      if (!razaoSocial) return res.status(404).json({ error: 'Razão social não encontrada' });
      res.status(200).json(razaoSocial);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar razão social' });
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const {
        CNPJ,
        inscricao_estadual,
        endereco,
        bairro,
        CEP,
        municipio,
        UF,
        telefone,
        clienteId,
        fornecedorId,
      } = req.body;

      const razaoSocialAtualizada = await prisma.razao_Social.update({
        where: { id: Number(id) },
        data: {
          CNPJ,
          inscricao_estadual,
          endereco,
          bairro,
          CEP,
          municipio,
          UF,
          telefone,
          cliente: clienteId ? { connect: { id: clienteId } } : undefined,
          fornecedor: fornecedorId ? { connect: { id: fornecedorId } } : undefined,
        },
      });
      res.status(200).json(razaoSocialAtualizada);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar razão social' });
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params;
      await prisma.razao_Social.delete({ where: { id: Number(id) } });
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar razão social' });
    }
  },
};

module.exports = razaoSocialController;
