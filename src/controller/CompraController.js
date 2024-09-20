const Compra = require('../models/Compra');

class CompraController {
  async create(req, res) {
    try {
      const compra = await Compra.create(req.body);
      res.status(201).json(compra);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getById(req, res) {
    try {
      const compra = await Compra.getById(req.params.id);
      res.status(200).json(compra);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const compra = await Compra.update(req.params.id, req.body);
      res.status(200).json(compra);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const response = await Compra.delete(req.params.id);
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const compras = await Compra.getAll();
      res.status(200).json(compras);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new CompraController();
