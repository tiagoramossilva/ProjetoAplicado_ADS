const LocalArmazenamento = require('../models/LocalArmazenamento');

class LocalArmazenamentoController {
  async create(req, res) {
    try {
      const local = await LocalArmazenamento.create(req.body);
      res.status(201).json(local);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getById(req, res) {
    try {
      const local = await LocalArmazenamento.getById(req.params.id);
      res.status(200).json(local);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const local = await LocalArmazenamento.update(req.params.id, req.body);
      res.status(200).json(local);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const response = await LocalArmazenamento.delete(req.params.id);
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const locais = await LocalArmazenamento.getAll();
      res.status(200).json(locais);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new LocalArmazenamentoController();
