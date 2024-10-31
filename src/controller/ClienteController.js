const Cliente = require('../models/Cliente'); // Ajuste o caminho conforme necessário

class ClienteController {
  static async create(req, res) {
    try {
      const clienteData = req.body;
      const novoCliente = await Cliente.create(clienteData);
      return res.status(201).json(novoCliente);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  static async getById(req, res) {
    try {
      const { id } = req.params;
      const cliente = await Cliente.getById(id);
      return res.status(200).json(cliente);
    } catch (error) {
      return res.status(404).json({ message: error.message });
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.params;
      const updateData = req.body;
      const clienteAtualizado = await Cliente.update(id, updateData);
      return res.status(200).json(clienteAtualizado);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.params;
      const response = await Cliente.delete(id);
      return res.status(200).json(response);
    } catch (error) {
      return res.status(404).json({ message: error.message });
    }
  }

  static async getAll(req, res) {
    try {
      const clientes = await Cliente.getAll();
      return res.status(200).json(clientes);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}

module.exports = ClienteController;
