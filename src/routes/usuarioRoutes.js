const express = require('express');
const UsuarioController = require('../controller/UsuarioController');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/', UsuarioController.create);

router.post('/login', UsuarioController.login);

router.get('/', auth, UsuarioController.getAll);

router.get('/:id', auth, UsuarioController.getById);

router.put('/:id', auth, UsuarioController.update);

router.delete('/:id', auth, UsuarioController.delete);

module.exports = router;
