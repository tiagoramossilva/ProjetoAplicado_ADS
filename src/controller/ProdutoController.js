const Produto = require('../models/Produto');

class ProdutoController {
  static async create(req, res) {
    try {
      const produto = await Produto.create(req.body);
      res.status(201).json(produto);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getById(req, res) {
    try {
      const produto = await Produto.getById(req.params.id);
      res.status(200).json(produto);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  static async update(req, res) {
    try {
      const produto = await Produto.update(req.params.id, req.body);
      res.status(200).json(produto);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  static async delete(req, res) {
    try {
      const message = await Produto.delete(req.params.id);
      res.status(200).json(message);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  static async getAll(req, res) {
    try {
      const produtos = await Produto.getAll();
      res.status(200).json(produtos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = ProdutoController;
