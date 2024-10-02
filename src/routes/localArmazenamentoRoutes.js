const express = require('express');
const LocalArmazenamentoController = require('../controller/LocalArmazenamentoController');
const router = express.Router();

router.post('/', LocalArmazenamentoController.create);

router.get('/', LocalArmazenamentoController.getAll);

router.get('/:id', LocalArmazenamentoController.getById);

router.put('/:id', LocalArmazenamentoController.update);

router.delete('/:id', LocalArmazenamentoController.delete);

module.exports = router;
