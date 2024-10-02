const express = require('express');
const FornecedorController = require('../controller/FornecedorController');
const router = express.Router();

router.post('/', FornecedorController.create);

router.get('/', FornecedorController.getAll);

router.get('/:id', FornecedorController.getById);

router.put('/:id', FornecedorController.update);

router.delete('/:id', FornecedorController.delete);

module.exports = router;
