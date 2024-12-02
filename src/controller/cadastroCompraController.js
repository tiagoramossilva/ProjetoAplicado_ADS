const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const fornecedorController = require("../repositories/Fornecedor");
const clienteController = require("../repositories/Cliente");
const produtoController = require("../repositories/Produto");
const projetoController = require("../repositories/Projeto");
const adicionaisController = require("../repositories/Adicionais");

const cadastroCompraController = {
  create: async (req, res) => {
    const { fornecedor, cliente, compra, produtos, projeto, adicionais } = req.body;

    try {
      // Iniciar a criação de todos os dados com as transações
      const novoFornecedor = await fornecedorController.createWithTransaction(fornecedor, prisma);
      const novoCliente = await clienteController.createWithTransaction(cliente, prisma);
      const novoProjeto = await projetoController.createWithTransaction(projeto, prisma);
      const novosAdicionais = await adicionaisController.createWithTransaction(adicionais, prisma);

      // Criar os produtos dentro da transação
      const novoProduto = await produtoController.createWithTransaction(produtos, prisma);
      const novoProdutoId = novoProduto[0].id;  // Extraímos o ID do produto criado

      // Criar a compra, associando diretamente todos os dados
      const novaCompra = await prisma.compra.create({
        data: {
          ...compra,  // Dados principais da compra
          // Associar o fornecedor, cliente, projeto, e adicionais já criados
          fornecedor: {
            connect: { id: novoFornecedor.id },  // Conectamos o fornecedor à compra
          },
          cliente: {
            connect: { id: novoCliente.id },  // Conectamos o cliente à compra
          },
          projeto: {
            connect: { id: novoProjeto.id },  // Conectamos o projeto à compra
          },
          adicionais: {
            connect: { id: novosAdicionais.id },  // Conectamos os adicionais à compra
          },
          // Associar o produto (já criado) à compra
          produto: {
            connect: { id: novoProdutoId },  // Conectamos o produto à compra
          },
        },
        include: {
          fornecedor: true,
          cliente: true,
          projeto: true,
          adicionais: true,
          produto: true,  // Inclui os dados relacionados no retorno
        }
      });

      // Resposta de sucesso, com os dados da compra criada
      res.status(201).json({
        message: "Compra e todos os dados cadastrados com sucesso!",
        compraId: novaCompra.id,
      });

    } catch (error) {
      // Caso ocorra erro, todos os dados criados são revertidos
      console.error("Erro ao cadastrar compra: ", error);
      res.status(500).json({
        error: "Erro ao registrar a compra. Tente novamente.",
        detalhes: error.message,
      });
    }
  },
};

module.exports = cadastroCompraController;
