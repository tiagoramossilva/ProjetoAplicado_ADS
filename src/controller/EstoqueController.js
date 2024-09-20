const Estoque = require('../models/Estoque');
const Produto = require('../models/Produto');

class EstoqueController {
  async create(req, res) {
    try {
      const { produto_id } = req.body;

      const produto = await Produto.getById(produto_id);
      if (!produto) {
        return res.status(400).json({ error: 'Produto inválido' });
      }

      const estoque = await Estoque.create(req.body);
      res.status(201).json(estoque);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getById(req, res) {
    try {
      const estoque = await Estoque.getById(req.params.id);
      res.status(200).json(estoque);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const { produto_id } = req.body;

      if (produto_id) {
        const produto = await Produto.getById(produto_id);
        if (!produto) {
          return res.status(400).json({ error: 'Produto inválido' });
        }
      }

      const estoque = await Estoque.update(req.params.id, req.body);
      res.status(200).json(estoque);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const response = await Estoque.delete(req.params.id);
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const estoques = await Estoque.getAll();
      res.status(200).json(estoques);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new EstoqueController();
