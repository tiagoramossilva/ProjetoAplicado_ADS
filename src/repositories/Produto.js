const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const produtoController = {
  // Método original para criar um produto (sem transação)
  create: async (req, res) => {
    try {
      const {
        nome,
        numero_serie,
        fabricante,
        descricao,
        tipo_unitario,
        quantidade,
        andar,
        sala,
        armario,
      } = req.body;
      const produtoCriado = await prisma.produto.create({
        data: {
          nome,
          numero_serie,
          fabricante,
          descricao,
          tipo_unitario,
          quantidade,
          andar,
          sala,
          armario,
        },
      });
      res.status(201).json(produtoCriado);
    } catch (error) {
      res.status(500).json({ error: "Erro ao criar produto" });
    }
  },

  async createWithTransaction(produtoData, prisma) {
    try {
      const produtosCriados = []; // Array para armazenar os produtos criados
      for (const produto of produtoData) {
        const produtoCriado = await prisma.produto.create({
          data: produto,
        });
        produtosCriados.push(produtoCriado); // Adiciona o produto criado ao array
      }
      return produtosCriados;
      // Retorna todos os produtos criados
    } catch (error) {
      console.error("Erro ao criar produto dentro da transação:", error);
      throw new Error("Erro ao criar produto dentro da transação");
    }
  },

  getAll: async (req, res) => {
    try {
      const produtos = await prisma.produto.findMany();
      res.status(200).json(produtos);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar produtos" });
    }
  },

  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const produto = await prisma.produto.findUnique({
        where: { id: Number(id) },
      });
      if (!produto) {
        return res.status(404).json({ error: "Produto não encontrado" });
      }
      res.status(200).json(produto);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar produto" });
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const {
        nome,
        numero_serie,
        fabricante,
        descricao,
        tipo_unitario,
        quantidade,
        andar,
        sala,
        armario,
      } = req.body;
      const produtoAtualizado = await prisma.produto.update({
        where: { id: Number(id) },
        data: {
          nome,
          numero_serie,
          fabricante,
          descricao,
          tipo_unitario,
          quantidade,
          andar,
          sala,
          armario,
        },
      });
      res.status(200).json(produtoAtualizado);
    } catch (error) {
      res.status(500).json({ error: "Erro ao atualizar produto" });
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params;
      await prisma.produto.delete({ where: { id: Number(id) } });
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Erro ao deletar produto" });
    }
  },

  getProdutosComProjetos: async (req, res) => {
    // Adaptado para receber req e res
    try {
      const produtos = await prisma.produto.findMany({
        include: {
          compras: {
            include: {
              projeto: {
                select: {
                  nome_projeto: true,
                },
              },
            },
          },
        },
      });
      res.status(200).json(produtos); // Retorna os produtos com o status 200
    } catch (error) {
      console.error("Erro ao buscar produtos com projetos:", error);
      res.status(500).json({ error: "Erro ao buscar produtos com projetos" });
    }
  },
};

module.exports = produtoController;
