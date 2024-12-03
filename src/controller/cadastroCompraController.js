const fornecedorController = require("../repositories/Fornecedor");
const clienteController = require("../repositories/Cliente");
const produtoController = require("../repositories/Produto");
const compraController = require("../repositories/Compra");
const projetoController = require("../repositories/Projeto");
const adicionaisController = require("../repositories/Adicionais");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const cadastroCompraController = {
  create: async (req, res) => {
    const { fornecedor, cliente, compra, produtos, projeto, adicionais } =
      req.body;

    try {
      // Iniciar transações separadas
      const novoFornecedor = await fornecedorController.createWithTransaction(
        fornecedor,
        prisma
      );
      const novoCliente = await clienteController.createWithTransaction(
        cliente,
        prisma
      );
      const novoProjeto = await projetoController.createWithTransaction(
        projeto,
        prisma
      );
      const novosAdicionais = await adicionaisController.createWithTransaction(
        adicionais,
        prisma
      );

      // Criar o produto
      const novoProduto = await produtoController.createWithTransaction(
        produtos,
        prisma
      );
      const novoProdutoId = novoProduto[0].id; // Obter o ID do primeiro produto

      // **Atualizar a compra com o produto_id**
      const novaCompra = await compraController.createWithTransaction(
        {
          ...compra, // Copiar os dados existentes da compra
          produto_id: novoProdutoId, // Adicionar o produto_id
        },
        prisma
      );

      // Associar outros IDs à compra
      await compraController.associarIds(
        novaCompra.id,
        novoProdutoId,
        novoProjeto.id,
        novoFornecedor.id,
        novoCliente.id,
        novosAdicionais.id,
        prisma
      );

      // Retornar sucesso
      res.status(201).json({
        message: "Compra e todos os dados cadastrados com sucesso!",
        compraId: novaCompra.id,
      });
    } catch (error) {
      // Em caso de erro, a transação será revertida
      console.error("Erro ao cadastrar compra: ", error);
      res.status(500).json({
        error: "Erro ao registrar a compra. Tente novamente.",
        detalhes: error.message,
      });
    }
  },
};

module.exports = cadastroCompraController;
