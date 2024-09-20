const express = require('express');
const CompradorController = require('../controller/CompradorController');

const router = express.Router();

router.post('/', CompradorController.create);

router.get('/', CompradorController.getAll);

router.get('/:id', CompradorController.getById);

router.put('/:id', CompradorController.update);

router.delete('/:id', CompradorController.delete);

module.exports = router;
