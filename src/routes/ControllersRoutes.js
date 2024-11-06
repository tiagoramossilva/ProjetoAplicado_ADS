const express = require("express");
const router = express.Router();

const { loginUser } = require("../controller/authController");
const usuarioController = require("../controller/UsuarioController");
const razaoSocialController = require("../controller/RazaoSocialController");
const projetoController = require("../controller/ProjetoController");
const produtoController = require("../controller/ProdutoController");
const localArmazenamentoController = require("../controller/LocalArmazenamentoController");
const fornecedorController = require("../controller/FornecedorController");
const estoqueController = require("../controller/EstoqueController");
const compraController = require("../controller/CompraController");
const clienteController = require("../controller/ClienteController");
const AdicionaisController = require("../controller/AdicionaisController");

router.post("/login", loginUser);

// Rotas de Compras
router.post("/compra", compraController.create);
router.get("/compra", compraController.getAll);
router.get("/compra/:id", compraController.getById);
router.put("/compra/:id", compraController.update);
router.delete("/compra/:id", compraController.delete);

// Rotas de Produtos
router.post("/produto", produtoController.create);
router.get("/produto", produtoController.getAll);
router.get("/produto/:id", produtoController.getById);
router.put("/produto/:id", produtoController.update);
router.delete("/produto/:id", produtoController.delete);

// Rotas de Usuário
router.post("/usuarios", usuarioController.create);
router.get("/usuarios", usuarioController.getAll);
router.get("/usuarios/:id", usuarioController.getById);
router.put("/usuarios/:id", usuarioController.update);
router.delete("/usuarios/:id", usuarioController.delete);

// Rotas de Projeto
router.post("/projetos", projetoController.create);
router.get("/projetos", projetoController.getAll);
router.get("/projetos/:id", projetoController.getById);
router.put("/projetos/:id", projetoController.update);
router.delete("/projetos/:id", projetoController.delete);

// Rotas de Cliente
router.post("/clientes", clienteController.create);
router.get("/clientes", clienteController.getAll);
router.get("/clientes/:id", clienteController.getById);
router.put("/clientes/:id", clienteController.update);
router.delete("/clientes/:id", clienteController.delete);

// Rotas de Fornecedor
router.post("/fornecedores", fornecedorController.create);
router.get("/fornecedores", fornecedorController.getAll);
router.get("/fornecedores/:id", fornecedorController.getById);
router.put("/fornecedores/:id", fornecedorController.update);
router.delete("/fornecedores/:id", fornecedorController.delete);

// Rotas de Razão Social
router.post("/razao-sociais", razaoSocialController.create);
router.get("/razao-sociais", razaoSocialController.getAll);
router.get("/razao-sociais/:id", razaoSocialController.getById);
router.put("/razao-sociais/:id", razaoSocialController.update);
router.delete("/razao-sociais/:id", razaoSocialController.delete);

// Rotas de Estoque
router.post("/estoques", estoqueController.create);
router.get("/estoques", estoqueController.getAll);
router.get("/estoques/:id", estoqueController.getById);
router.put("/estoques/:id", estoqueController.update);
router.delete("/estoques/:id", estoqueController.delete);

// Rotas de Local de Armazenamento
router.post("/locais-armazenamento", localArmazenamentoController.create);
router.get("/locais-armazenamento", localArmazenamentoController.getAll);
router.get("/locais-armazenamento/:id", localArmazenamentoController.getById);
router.put("/locais-armazenamento/:id", localArmazenamentoController.update);
router.delete("/locais-armazenamento/:id", localArmazenamentoController.delete);

// Rota para criar observações
router.post("/adicionais", AdicionaisController.createAdicional);

module.exports = router;
