const Comprador = require('../models/Comprador');

class CompradorController {
  async create(req, res) {
    try {
      const comprador = await Comprador.create(req.body);
      res.status(201).json(comprador);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getById(req, res) {
    try {
      const comprador = await Comprador.getById(req.params.id);
      res.status(200).json(comprador);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const comprador = await Comprador.update(req.params.id, req.body);
      res.status(200).json(comprador);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const response = await Comprador.delete(req.params.id);
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const compradores = await Comprador.getAll();
      res.status(200).json(compradores);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new CompradorController();
