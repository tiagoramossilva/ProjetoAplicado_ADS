const fornecedorController = require("./FornecedorController");
const clienteController = require("./ClienteController");
const produtoController = require("./ProdutoController");
const compraController = require("./CompraController");
const projetoController = require("./ProjetoController");
const adicionaisController = require("./AdicionaisController");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const cadastroCompraController = {
  create: async (req, res) => {
    const { fornecedor, cliente, compra, produtos, projeto, adicionais } =
      req.body;

    try {
      // Iniciando a transação
      const result = await prisma.$transaction(async () => {
        // 1. Criar o fornecedor
        const novoFornecedor = await fornecedorController.createWithTransaction(
          fornecedor,
          prisma
        );

        // 2. Criar o cliente
        const novoCliente = await clienteController.createWithTransaction(
          cliente,
          prisma
        );

        // 3. Criar o projeto (se necessário)
        const novoProjeto = await projetoController.createWithTransaction(
          projeto,
          prisma
        );

        // 4. Criar os adicionais
        const novosAdicionais =
          await adicionaisController.createWithTransaction(adicionais, prisma);

        // 5. Criar os produtos
        const produtosRefs = await Promise.all(
          produtos.map(async (produto) => {
            // Criar o produto utilizando o controlador de produtos diretamente
            const produtoData = {
              nome: produto.nome,
              numero_serie: produto.numero_serie,
              fabricante: produto.fabricante,
              descricao: produto.descricao,
              tipo_unitario: produto.tipo_unitario,
              quantidade: produto.quantidade,
              andar: produto.andar,
              sala: produto.sala,
              armario: produto.armario,
            };

            // Chamando o método de criação no controlador de produto
            const createdProduto =
              await produtoController.createWithTransaction({
                body: produtoData, // Passa os dados como se fosse uma requisição
                // Não precisamos da transação, pois o controller de produto deve já lidar com isso
              });

            return createdProduto;
          })
        );

        // 6. Criar a compra
        const novaCompra = await compraController.createWithTransaction(
          compra,
          prisma
        );

        // Associar todos os dados
        await compraController.associarProdutosComCompra(
          novaCompra.id,
          produtosRefs,
          novoProjeto.id,
          novoFornecedor.id,
          novoCliente.id,
          novosAdicionais.id,
          prisma
        );

        return novaCompra;
      });

      // Retornar sucesso
      res.status(201).json({
        message: "Compra e todos os dados cadastrados com sucesso!",
        compraId: result.id,
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
