const Compra = require('../models/Compra');

class CompraController {
  static async create(req, res) {
    try {
      const compraData = req.body;
      const novaCompra = await Compra.create(compraData);
      res.status(201).json(novaCompra);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getById(req, res) {
    try {
      const compra = await Compra.getById(req.params.id);
      res.status(200).json(compra);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  static async update(req, res) {
    try {
      const compraAtualizada = await Compra.update(req.params.id, req.body);
      res.status(200).json(compraAtualizada);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async delete(req, res) {
    try {
      const response = await Compra.delete(req.params.id);
      res.status(200).json(response);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  static async getAll(req, res) {
    try {
      const compras = await Compra.getAll();
      res.status(200).json(compras);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = CompraController;
