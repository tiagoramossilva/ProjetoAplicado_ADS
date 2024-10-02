const express = require('express');
const RazaoSocialController = require('../controller/RazaoSocialController');
const router = express.Router();

router.post('/', RazaoSocialController.create);

router.get('/', RazaoSocialController.getAll);

router.get('/:id', RazaoSocialController.getById);

router.put('/:id', RazaoSocialController.update);

router.delete('/:id', RazaoSocialController.delete);

module.exports = router;
