const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const CompraController = {
  // Método original para criar uma compra (sem transação)
  async create(req, res) {
    const { data_compra, data_emissao, data_envio, valor_total } = req.body;

    try {
      const compra = await prisma.compra.create({
        data: {
          data_compra,
          data_emissao,
          data_envio,
          valor_total,
        },
      });
      return res.status(201).json(compra);
    } catch (error) {
      console.error("Erro ao criar compra:", error.message || error);
      return res
        .status(500)
        .json({ error: "Erro ao criar compra", detalhes: error.message });
    }
  },

  async createWithTransaction(compraData, prisma) {
    try {
      const compra = await prisma.compra.create({
        data: {
          data_compra: new Date(compraData.data_compra),
          data_emissao: new Date(compraData.data_emissao),
          data_envio: new Date(compraData.data_envio),
          valor_total: parseFloat(compraData.valor_total),
        },
      });
      return compra;
    } catch (error) {
      console.error("Erro ao criar compra:", error);
      throw new Error("Erro ao criar compra dentro da transação");
    }
  },

  async getAll(req, res) {
    try {
      const compras = await prisma.compra.findMany();
      return res.json(compras);
    } catch (error) {
      console.error("Erro ao buscar compras:", error);
      return res.status(500).json({ error: "Erro ao buscar compras" });
    }
  },

  async getById(req, res) {
    const { id } = req.params;
    try {
      const compra = await prisma.compra.findUnique({
        where: { id: Number(id) },
      });
      if (!compra) {
        return res.status(404).json({ error: "Compra não encontrada" });
      }
      return res.json(compra);
    } catch (error) {
      console.error("Erro ao buscar compra:", error);
      return res.status(500).json({ error: "Erro ao buscar compra" });
    }
  },

  async update(req, res) {
    const { id } = req.params;
    const { data_compra, data_emissao, data_envio, valor_total } = req.body;

    try {
      const compra = await prisma.compra.update({
        where: { id: Number(id) },
        data: {
          data_compra,
          data_emissao,
          data_envio,
          valor_total,
        },
      });
      return res.json(compra);
    } catch (error) {
      console.error("Erro ao atualizar compra:", error);
      return res
        .status(500)
        .json({ error: "Erro ao atualizar compra", detalhes: error.message });
    }
  },

  async delete(req, res) {
    const { id } = req.params;
    try {
      await prisma.compra.delete({
        where: { id: Number(id) },
      });
      return res.status(204).send();
    } catch (error) {
      console.error("Erro ao deletar compra:", error);
      return res.status(500).json({ error: "Erro ao deletar compra" });
    }
  },

  // No seu arquivo CompraController.js
  async associarIds(
    compraId,
    produtoId,
    projetoId,
    fornecedorId,
    clienteId,
    adicionaisId,
    prisma
  ) {
    // Validação para garantir que todos os IDs são válidos
    if (
      !compraId ||
      !produtoId ||
      !projetoId ||
      !fornecedorId ||
      !clienteId ||
      !adicionaisId
    ) {
      console.error("Erro: Todos os IDs devem ser fornecidos.");
      throw new Error("Todos os IDs devem ser fornecidos.");
    }

    try {
      // Atualiza a compra associando os dados passados (produtos, projeto, fornecedor, etc.)
      const compraAtualizada = await prisma.compra.update({
        where: {
          id: compraId, // Procurando pela compra usando o ID fornecido
        },
        data: {
          produto: {
            connect: {
              id: produtoId, // Conectando o produto à compra
            },
          },
          projeto: {
            connect: {
              id: projetoId, // Conectando o projeto à compra
            },
          },
          fornecedor: {
            connect: {
              id: fornecedorId, // Conectando o fornecedor à compra
            },
          },
          cliente: {
            connect: {
              id: clienteId, // Conectando o cliente à compra
            },
          },
          adicionais: {
            connect: {
              id: adicionaisId, // Conectando os adicionais à compra
            },
          },
        },
      });

      return compraAtualizada;
    } catch (error) {
      console.error("Erro ao associar dados com a compra:", error);
      throw new Error("Erro ao associar produtos com compra");
    }
  },
};

module.exports = CompraController;
