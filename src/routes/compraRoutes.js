const express = require('express');
const CompraController = require('../controller/CompraController');

const router = express.Router();

router.post('/', CompraController.create);

router.get('/', CompraController.getAll);

router.get('/:id', CompraController.getById);

router.put('/:id', CompraController.update);

router.delete('/:id', CompraController.delete);

module.exports = router;
