const express = require('express');
const UsuarioController = require('../controller/UsuarioController');

const router = express.Router();

router.post('/', UsuarioController.create);

router.get('/', UsuarioController.getAll);

router.get('/:id', UsuarioController.getById);

router.put('/:id', UsuarioController.update);

router.delete('/:id', UsuarioController.delete);

module.exports = router;
