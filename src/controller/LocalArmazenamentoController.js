const LocalArmazenamento = require('../models/localArmazenamento');

class LocalArmazenamentoController {
  static async create(req, res) {
    try {
      const localData = req.body;
      const novoLocal = await LocalArmazenamento.create(localData);
      res.status(201).json(novoLocal);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getById(req, res) {
    try {
      const { id } = req.params;
      const local = await LocalArmazenamento.getById(id);
      res.status(200).json(local);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.params;
      const updatedLocal = await LocalArmazenamento.update(id, req.body);
      res.status(200).json(updatedLocal);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.params;
      await LocalArmazenamento.delete(id);
      res.status(200).json({ message: 'Local de Armazenamento deletado com sucesso' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getAll(req, res) {
    try {
      const locais = await LocalArmazenamento.getAll();
      res.status(200).json(locais);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = LocalArmazenamentoController;
