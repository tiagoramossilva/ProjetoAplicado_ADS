const Projeto = require('../models/Projeto');

class ProjetoController {
  async create(req, res) {
    try {
      const projeto = await Projeto.create(req.body);
      res.status(201).json(projeto);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getById(req, res) {
    try {
      const projeto = await Projeto.getById(req.params.id);
      res.status(200).json(projeto);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const projeto = await Projeto.update(req.params.id, req.body);
      res.status(200).json(projeto);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const response = await Projeto.delete(req.params.id);
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const projetos = await Projeto.getAll();
      res.status(200).json(projetos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new ProjetoController();
