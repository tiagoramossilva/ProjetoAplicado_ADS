const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const CompraController = {
  async createCompra(req, res) {
    const { data_compra, data_emissao, data_envio, valor_total, usuario_id, produto_id, projeto_id, fornecedor_id, cliente_id } = req.body;
    try {
      const compra = await prisma.compra.create({
        data: {
          data_compra,
          data_emissao,
          data_envio,
          valor_total,
          usuario: { connect: { id: usuario_id } },
          produto: { connect: { id: produto_id } },
          projeto: { connect: { id: projeto_id } },
          fornecedor: { connect: { id: fornecedor_id } },
          cliente: { connect: { id: cliente_id } },
        },
      });
      return res.status(201).json(compra);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao criar compra' });
    }
  },

  async getAllCompras(req, res) {
    try {
      const compras = await prisma.compra.findMany();
      return res.json(compras);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao buscar compras' });
    }
  },

  async getCompraById(req, res) {
    const { id } = req.params;
    try {
      const compra = await prisma.compra.findUnique({
        where: { id: Number(id) },
      });
      if (!compra) return res.status(404).json({ error: 'Compra não encontrada' });
      return res.json(compra);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao buscar compra' });
    }
  },

  async updateCompra(req, res) {
    const { id } = req.params;
    const { data_compra, data_emissao, data_envio, valor_total, usuario_id, produto_id, projeto_id, fornecedor_id, cliente_id } = req.body;
    try {
      const compra = await prisma.compra.update({
        where: { id: Number(id) },
        data: {
          data_compra,
          data_emissao,
          data_envio,
          valor_total,
          usuario: { connect: { id: usuario_id } },
          produto: { connect: { id: produto_id } },
          projeto: { connect: { id: projeto_id } },
          fornecedor: { connect: { id: fornecedor_id } },
          cliente: { connect: { id: cliente_id } },
        },
      });
      return res.json(compra);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao atualizar compra' });
    }
  },

  async deleteCompra(req, res) {
    const { id } = req.params;
    try {
      await prisma.compra.delete({
        where: { id: Number(id) },
      });
      return res.status(204).send();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao deletar compra' });
    }
  },
};

module.exports = CompraController;
