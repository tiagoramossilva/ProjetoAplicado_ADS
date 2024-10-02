const express = require('express');
const ClienteController = require('../controller/ClienteController');
const router = express.Router();

router.post('/', ClienteController.create);

router.get('/:id', ClienteController.getById);

router.put('/:id', ClienteController.update);

router.delete('/:id', ClienteController.delete);

router.get('/', ClienteController.getAll);

module.exports = router;
