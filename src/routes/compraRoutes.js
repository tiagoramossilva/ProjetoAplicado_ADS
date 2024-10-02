const express = require('express');
const CompraController = require('../controller/CompraController');
const router = express.Router();

router.post('/', CompraController.create);

router.get('/:id', CompraController.getById);

router.put('/:id', CompraController.update);

router.delete('/:id', CompraController.delete);

router.get('/', CompraController.getAll);

module.exports = router;
