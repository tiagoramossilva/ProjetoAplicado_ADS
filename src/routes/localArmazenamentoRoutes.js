const express = require("express");
const LocalArmazenamentoController = require("../controller/localArmazenamentoController");
const router = express.Router();

router.post("/", LocalArmazenamentoController.create);

router.get("/:id", LocalArmazenamentoController.getById);

router.put("/:id", LocalArmazenamentoController.update);

router.delete("/:id", LocalArmazenamentoController.delete);

router.get("/", LocalArmazenamentoController.getAll);

module.exports = router;
