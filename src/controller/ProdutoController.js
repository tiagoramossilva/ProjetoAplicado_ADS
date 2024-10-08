const Produto = require('../models/Produto');

class ProdutoController {
  static async create(req, res) {
    try {
      const produtoData = req.body; 
      const novoProduto = await Produto.create(produtoData);
      res.status(201).json(novoProduto);
    } catch (error) {
      res.status(400).json({ error: error.message });
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
      const updatedProduto = await Produto.update(req.params.id, req.body);
      res.status(200).json(updatedProduto);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async delete(req, res) {
    try {
      const result = await Produto.delete(req.params.id);
      res.status(200).json(result);
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
