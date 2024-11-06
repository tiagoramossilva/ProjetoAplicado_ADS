const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const clienteController = {
  create: async (req, res) => {
    try {
      const { 
        razao_social_cliente, 
        CEP, 
        CNPJ, 
        UF, 
        bairro, 
        endereco, 
        inscricao_estadual, 
        municipio, 
        telefone 
      } = req.body;

      const novoCliente = await prisma.cliente.create({
        data: {
          razao_social_cliente,
          CEP,
          CNPJ,
          UF,
          bairro,
          endereco,
          inscricao_estadual,
          municipio,
          telefone
        },
      });

      res.status(201).json(novoCliente);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar cliente' });
    }
  },

  getAll: async (req, res) => {
    try {
      const clientes = await prisma.cliente.findMany({
        include: {
          razao_social_cliente: true,
          projetos: true,
          compras: true,
        },
      });
      res.status(200).json(clientes);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar clientes' });
    }
  },

  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const cliente = await prisma.cliente.findUnique({
        where: { id: Number(id) },
        include: {
          razao_social_cliente: true,
          projetos: true,
          compras: true,
        },
      });

      if (!cliente) return res.status(404).json({ error: 'Cliente não encontrado' });

      res.status(200).json(cliente);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar cliente' });
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { 
        razao_social_cliente, 
        CEP, 
        CNPJ, 
        UF, 
        bairro, 
        endereco, 
        inscricao_estadual, 
        municipio, 
        telefone 
      } = req.body;

      const clienteAtualizado = await prisma.cliente.update({
        where: { id: Number(id) },
        data: { 
          razao_social_cliente,
          CEP,
          CNPJ,
          UF,
          bairro,
          endereco,
          inscricao_estadual,
          municipio,
          telefone
        },
      });

      res.status(200).json(clienteAtualizado);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar cliente' });
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params;
      await prisma.cliente.delete({ where: { id: Number(id) } });
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar cliente' });
    }
  },
};

module.exports = clienteController;
