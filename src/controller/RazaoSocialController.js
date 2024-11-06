const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const RazaoSocialController = {
  async create(req, res) {
    const {
      CNPJ,
      inscricao_estadual,
      endereco,
      bairro,
      CEP,
      municipio,
      UF,
      telefone,
      clienteData,    // Dados completos para criar cliente
      fornecedorData, // Dados completos para criar fornecedor
    } = req.body;

    try {
      const razaoSocial = await prisma.razao_Social.create({
        data: {
          CNPJ,
          inscricao_estadual,
          endereco,
          bairro,
          CEP,
          municipio,
          UF,
          telefone,
          cliente: clienteData ? { create: clienteData } : undefined,
          fornecedor: fornecedorData ? { create: fornecedorData } : undefined,
        },
      });

      res.status(201).json(razaoSocial);
    } catch (error) {
      console.error("Erro ao criar razão social:", error.message || error);
      res.status(500).json({ error: 'Erro ao criar razão social', detalhes: error.message });
    }
  },

  async update(req, res) {
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
      clienteData,    // Dados completos para criar cliente
      fornecedorData, // Dados completos para criar fornecedor
    } = req.body;

    try {
      const razaoSocial = await prisma.razao_Social.update({
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
          cliente: clienteData ? { create: clienteData } : undefined,
          fornecedor: fornecedorData ? { create: fornecedorData } : undefined,
        },
      });

      res.status(200).json(razaoSocial);
    } catch (error) {
      console.error("Erro ao atualizar razão social:", error.message || error);
      res.status(500).json({ error: 'Erro ao atualizar razão social', detalhes: error.message });
    }
  },

  async delete(req, res) {
    const { id } = req.params;
    try {
      await prisma.razao_Social.delete({ where: { id: Number(id) } });
      res.status(204).send();
    } catch (error) {
      console.error("Erro ao deletar razão social:", error);
      res.status(500).json({ error: 'Erro ao deletar razão social' });
    }
  },

  async getAll(req, res) {
    try {
      const razoesSociais = await prisma.razao_Social.findMany({
        include: {
          cliente: true,  // Inclui cliente nas respostas
          fornecedor: true, // Inclui fornecedor nas respostas
        },
      });
      res.status(200).json(razoesSociais);
    } catch (error) {
      console.error("Erro ao buscar razões sociais:", error);
      res.status(500).json({ error: 'Erro ao buscar razões sociais' });
    }
  },

  async getById(req, res) {
    const { id } = req.params;
    try {
      const razaoSocial = await prisma.razao_Social.findUnique({
        where: { id: Number(id) },
        include: {
          cliente: true,  // Inclui cliente nas respostas
          fornecedor: true, // Inclui fornecedor nas respostas
        },
      });

      if (!razaoSocial) {
        return res.status(404).json({ error: 'Razão social não encontrada' });
      }

      res.status(200).json(razaoSocial);
    } catch (error) {
      console.error("Erro ao buscar razão social:", error);
      res.status(500).json({ error: 'Erro ao buscar razão social' });
    }
  },
};

module.exports = RazaoSocialController;
