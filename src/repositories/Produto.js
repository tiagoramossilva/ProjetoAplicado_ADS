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
      // Inicia uma transação no Prisma para garantir atomicidade
      const produtosCriados = await prisma.$transaction(async (tx) => {
        const produtos = [];
        for (const produto of produtoData) {
          const produtoCriado = await tx.produto.create({
            data: produto,
          });
          produtos.push(produtoCriado); // Adiciona cada produto ao array
        }
        return produtos; // Retorna todos os produtos criados
      });

      return produtosCriados; // Retorna os produtos criados
    } catch (error) {
      console.error("Erro ao criar produtos dentro da transação:", error);
      throw new Error("Erro ao criar produtos dentro da transação");
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
      if (!req.user.admin) {
      return res.status(403).json({ error: "Acesso negado: requer privilégios de admin" });
    }
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

      // Verifica se o ID é um número
      const produtoId = Number(id);
      if (isNaN(produtoId)) {
        return res.status(400).json({ error: "ID inválido" });
      }

      // Verifica se o produto existe
      const produtoExistente = await prisma.produto.findUnique({
        where: { id: produtoId },
      });

      if (!produtoExistente) {
        return res.status(404).json({ error: "Produto não encontrado" });
      }

      if (!req.user?.admin) {
      return res.status(403).json({ error: "Acesso negado: requer privilégios de admin" });
    }

      // Deleta o produto
      await prisma.produto.delete({
        where: { id: produtoId },
      });

      res.status(204).send(); // Sucesso: sem conteúdo
    } catch (error) {
      console.error("Erro ao deletar produto:", error);
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
