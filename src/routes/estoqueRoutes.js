const express = require('express');
const EstoqueController = require('../controller/EstoqueController');

const router = express.Router();

router.post('/', EstoqueController.create);

router.get('/', EstoqueController.getAll);

router.get('/:id', EstoqueController.getById);

router.put('/:id', EstoqueController.update);

router.delete('/:id', EstoqueController.delete);

module.exports = router;
