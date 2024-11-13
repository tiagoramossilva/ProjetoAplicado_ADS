const express = require("express");
const router = express.Router();

const { loginUser } = require("../controller/authController");
const usuarioController = require("../repositories/Usuario");
const projetoController = require("../repositories/Projeto");
const produtoController = require("../repositories/Produto");
const fornecedorController = require("../repositories/Fornecedor");
const compraController = require("../repositories/Compra");
const clienteController = require("../repositories/Cliente");
const AdicionaisController = require("../repositories/Adicionais");
const cadastroCompraController = require("../controller/cadastroCompraController");

router.post("/cadastro-compra", cadastroCompraController.create);

router.post("/login", loginUser);

router.post("/compra", compraController.create);
router.get("/compra", compraController.getAll);
router.get("/compra/:id", compraController.getById);
router.put("/compra/:id", compraController.update);
router.delete("/compra/:id", compraController.delete);
router.get(
  "/compras-com-relacionamentos",
  compraController.getAllWithRelatedData
);

router.post("/produto", produtoController.create);
router.get("/produto", produtoController.getAll);
router.get("/produto/:id", produtoController.getById);
router.put("/produto/:id", produtoController.update);
router.delete("/produto/:id", produtoController.delete);
router.get("/produto-com-projeto", produtoController.getProdutosComProjetos);

router.post("/usuarios", usuarioController.create);
router.get("/usuarios", usuarioController.getAll);
router.get("/usuarios/:id", usuarioController.getById);
router.put("/usuarios/:id", usuarioController.update);
router.delete("/usuarios/:id", usuarioController.delete);

router.post("/projetos", projetoController.create);
router.get("/projetos", projetoController.getAll);
router.get("/projetos/:id", projetoController.getById);
router.put("/projetos/:id", projetoController.update);
router.delete("/projetos/:id", projetoController.delete);

router.post("/clientes", clienteController.create);
router.get("/clientes", clienteController.getAll);
router.get("/clientes/:id", clienteController.getById);
router.put("/clientes/:id", clienteController.update);
router.delete("/clientes/:id", clienteController.delete);

router.post("/fornecedores", fornecedorController.create);
router.get("/fornecedores", fornecedorController.getAll);
router.get("/fornecedores/:id", fornecedorController.getById);
router.put("/fornecedores/:id", fornecedorController.update);
router.delete("/fornecedores/:id", fornecedorController.delete);

router.post("/adicionais", AdicionaisController.createAdicional);

module.exports = router;
