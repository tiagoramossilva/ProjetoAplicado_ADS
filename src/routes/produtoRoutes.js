const express = require('express');
const ProdutoController = require('../controller/ProdutoController');
const router = express.Router();

router.post('/', ProdutoController.create);

router.get('/:id', ProdutoController.getById);

router.put('/:id', ProdutoController.update);

router.delete('/:id', ProdutoController.delete);

router.get('/', ProdutoController.getAll);

module.exports = router;

