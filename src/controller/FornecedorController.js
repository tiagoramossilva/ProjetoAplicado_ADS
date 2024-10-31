const Fornecedor = require('../models/Fornecedor'); // Ajuste o caminho conforme necessário

class FornecedorController {
  static async create(req, res) {
    try {
      const fornecedorData = req.body;
      const novoFornecedor = await Fornecedor.create(fornecedorData);
      return res.status(201).json(novoFornecedor);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  static async getById(req, res) {
    try {
      const { id } = req.params;
      const fornecedor = await Fornecedor.getById(id);
      return res.status(200).json(fornecedor);
    } catch (error) {
      return res.status(404).json({ message: error.message });
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.params;
      const updateData = req.body;
      const fornecedorAtualizado = await Fornecedor.update(id, updateData);
      return res.status(200).json(fornecedorAtualizado);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.params;
      const response = await Fornecedor.delete(id);
      return res.status(200).json(response);
    } catch (error) {
      return res.status(404).json({ message: error.message });
    }
  }

  static async getAll(req, res) {
    try {
      const fornecedores = await Fornecedor.getAll();
      return res.status(200).json(fornecedores);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}

module.exports = FornecedorController;
