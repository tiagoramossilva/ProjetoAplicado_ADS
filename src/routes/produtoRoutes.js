const express = require('express');
const ProdutoController = require('../controller/ProdutoController');

const router = express.Router();

router.post('/', ProdutoController.create);

router.get('/', ProdutoController.getAll);

router.get('/:id', ProdutoController.getById);

router.put('/:id', ProdutoController.update);

router.delete('/:id', ProdutoController.delete);

module.exports = router;
