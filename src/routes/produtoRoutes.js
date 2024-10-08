const express = require('express');
const ProdutoController = require('../controller/produtoController');

const router = express.Router();

router.post('/', ProdutoController.create);

router.get('/:id', ProdutoController.getById);

router.put('/:id', ProdutoController.update);

router.delete('/:id', ProdutoController.delete);

router.get('/', ProdutoController.getAll);

module.exports = router;
