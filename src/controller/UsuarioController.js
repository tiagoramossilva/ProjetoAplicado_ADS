const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const usuarioController = {
  create: async (req, res) => {
    try {
      const { nome, email, funcao, admin, usuario, senha } = req.body;
      const usuarioCriado = await prisma.usuario.create({
        data: { nome, email, funcao, admin, usuario, senha },
      });
      res.status(201).json(usuarioCriado);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar usuário' });
    }
  },

  getAll: async (req, res) => {
    try {
      const usuarios = await prisma.usuario.findMany();
      res.status(200).json(usuarios);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar usuários' });
    }
  },

  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const usuario = await prisma.usuario.findUnique({ where: { id: Number(id) } });
      if (!usuario) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }
      res.status(200).json(usuario);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar usuário' });
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { nome, email, funcao, admin, usuario, senha } = req.body;
      const usuarioAtualizado = await prisma.usuario.update({
        where: { id: Number(id) },
        data: { nome, email, funcao, admin, usuario, senha },
      });
      res.status(200).json(usuarioAtualizado);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar usuário' });
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params;
      await prisma.usuario.delete({ where: { id: Number(id) } });
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar usuário' });
    }
  },

  info_adicionais: async (req, res) => {
    try {
      const { id } = req.params; // O ID do usuário é passado como parâmetro
      const { observacoes, usuario } = req.body; // Informações adicionais do corpo da requisição

      // Atualiza as informações adicionais do usuário
      const usuarioAtualizado = await prisma.usuario.update({
        where: { id: Number(id) },
        data: {
          adicionais: { // Supondo que você tenha um campo 'adicionais' no seu modelo
            observacoes: observacoes || undefined, // Mantém o valor antigo se não houver novo
            usuario: usuario || undefined,
          },
        },
      });

      res.status(200).json({ message: 'Informações adicionais atualizadas com sucesso', usuario: usuarioAtualizado });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar informações adicionais do usuário' });
    }
  },
};

module.exports = usuarioController;
