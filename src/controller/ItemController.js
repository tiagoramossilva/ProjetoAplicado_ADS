const Item = require('../models/Item');

class ItemController {
  async create(req, res) {
    try {
      const item = await Item.create(req.body);
      res.status(201).json(item);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getById(req, res) {
    try {
      const item = await Item.getById(req.params.id);
      res.status(200).json(item);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const item = await Item.update(req.params.id, req.body);
      res.status(200).json(item);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const response = await Item.delete(req.params.id);
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const itens = await Item.getAll();
      res.status(200).json(itens);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new ItemController();
