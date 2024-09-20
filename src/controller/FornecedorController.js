const Fornecedor = require('../models/Fornecedor');

class FornecedorController {
  async create(req, res) {
    try {
      const fornecedor = await Fornecedor.create(req.body);
      res.status(201).json(fornecedor);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getById(req, res) {
    try {
      const fornecedor = await Fornecedor.getById(req.params.id);
      res.status(200).json(fornecedor);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const fornecedor = await Fornecedor.update(req.params.id, req.body);
      res.status(200).json(fornecedor);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const response = await Fornecedor.delete(req.params.id);
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const fornecedores = await Fornecedor.getAll();
      res.status(200).json(fornecedores);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new FornecedorController();
