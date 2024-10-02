const express = require('express');
const ProjetoController = require('../controller/ProjetoController');
const router = express.Router();

router.post('/', ProjetoController.create);

router.get('/:id', ProjetoController.getById);

router.put('/:id', ProjetoController.update);

router.delete('/:id', ProjetoController.delete);

router.get('/', ProjetoController.getAll);

module.exports = router;
