const Usuario = require('../models/Usuario');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

class UsuarioController {
  async create(req, res) {
    try {
      const { nome, email, funcao, permissao, usuario, senha } = req.body;

      const existingUser = await Usuario.findByUsuario(usuario);
      if (existingUser) {
        return res.status(400).json({ error: 'Usuário já existe.' });
      }

      const existingEmail = await Usuario.findByEmail(email);
      if (existingEmail) {
        return res.status(400).json({ error: 'Email já está em uso.' });
      }

      // Hash a senha antes de salvar
      const salt = await bcrypt.genSalt(10);
      const hashedSenha = await bcrypt.hash(senha, salt);

      const usuarioData = {
        nome,
        email,
        funcao,
        permissao,
        usuario,
        senha: hashedSenha
      };

      const novoUsuario = await Usuario.create(usuarioData);
      res.status(201).json(novoUsuario);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async login(req, res) {
    try {
      const { usuario, senha } = req.body;

      const usuarioObj = await Usuario.findByUsuario(usuario);
      if (!usuarioObj) {
        return res.status(400).json({ error: 'Usuário ou senha inválidos.' });
      }

      const isMatch = await bcrypt.compare(senha, usuarioObj.senha);
      if (!isMatch) {
        return res.status(400).json({ error: 'Usuário ou senha inválidos.' });
      }

      const token = jwt.sign(
        { id: usuarioObj.id, nome: usuarioObj.nome },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getById(req, res) {
    try {
      const usuario = await Usuario.getById(req.params.id);
      res.status(200).json(usuario);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const usuario = await Usuario.update(req.params.id, req.body);
      res.status(200).json(usuario);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const response = await Usuario.delete(req.params.id);
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const usuarios = await Usuario.getAll();
      res.status(200).json(usuarios);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new UsuarioController();
