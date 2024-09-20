// routes/projetoRoutes.js
const express = require('express');
const ProjetoController = require('../controller/ProjetoController');

const router = express.Router();

router.post('/', ProjetoController.create);

router.get('/', ProjetoController.getAll);

router.get('/:id', ProjetoController.getById);

router.put('/:id', ProjetoController.update);

router.delete('/:id', ProjetoController.delete);

module.exports = router;
