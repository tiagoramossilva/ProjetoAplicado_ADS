const Cliente = require('../models/Cliente');

class ClienteController {
  static async create(req, res) {
    try {
      const clienteData = req.body;
      const novoCliente = await Cliente.create(clienteData);
      res.status(201).json(novoCliente);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getById(req, res) {
    try {
      const cliente = await Cliente.getById(req.params.id);
      res.status(200).json(cliente);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  static async update(req, res) {
    try {
      const clienteAtualizado = await Cliente.update(req.params.id, req.body);
      res.status(200).json(clienteAtualizado);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async delete(req, res) {
    try {
      const response = await Cliente.delete(req.params.id);
      res.status(200).json(response);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  static async getAll(req, res) {
    try {
      const clientes = await Cliente.getAll();
      res.status(200).json(clientes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = ClienteController;
