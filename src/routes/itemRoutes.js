const express = require('express');
const ItemController = require('../controller/ItemController');

const router = express.Router();

router.post('/', ItemController.create);

router.get('/', ItemController.getAll);

router.get('/:id', ItemController.getById);

router.put('/:id', ItemController.update);

router.delete('/:id', ItemController.delete);

module.exports = router;
