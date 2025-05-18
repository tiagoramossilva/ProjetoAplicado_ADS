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
      // Extrai o xml_url de compra
      const { xml_url } = compra;

      // Criar as entidades relacionadas
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
      const novoProduto = await produtoController.createWithTransaction(
        produtos,
        prisma
      );

      // Criar a compra e associar todos os IDs relacionados
      const novaCompra = await compraController.createWithTransaction(
        {
          ...compra,
          xml_url, // Garante que o xml_url está presente
          produto_id: novoProduto[0].id,
          projeto_id: novoProjeto.id,
          fornecedor_id: novoFornecedor.id,
          cliente_id: novoCliente.id,
          adicionais_id: novosAdicionais.id,
        },
        prisma
      );

      res.status(201).json({
        message: "Compra e todos os dados cadastrados com sucesso!",
        compraId: novaCompra.id,
      });
    } catch (error) {
      console.error("Erro ao cadastrar compra: ", error);
      res.status(500).json({
        error: "Erro ao registrar a compra. Tente novamente.",
        detalhes: error.message,
      });
    }
  },
};

module.exports = cadastroCompraController;
