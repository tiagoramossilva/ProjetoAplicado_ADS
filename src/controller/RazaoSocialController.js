const RazaoSocial = require('../models/RazaoSocial');

class RazaoSocialController {
  async create(req, res) {
    try {
      const razaoSocial = await RazaoSocial.create(req.body);
      res.status(201).json(razaoSocial);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getById(req, res) {
    try {
      const razaoSocial = await RazaoSocial.getById(req.params.id);
      res.status(200).json(razaoSocial);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  // Atualizar uma Razão Social
  async update(req, res) {
    try {
      const razaoSocial = await RazaoSocial.update(req.params.id, req.body);
      res.status(200).json(razaoSocial);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const response = await RazaoSocial.delete(req.params.id);
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const razoes = await RazaoSocial.getAll();
      res.status(200).json(razoes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new RazaoSocialController();
