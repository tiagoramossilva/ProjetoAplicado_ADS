const db = require('../config/firebase');

class Usuario {
  constructor(id, nome, email, funcao, permissao, usuario, senha) {
    this.id = id;
    this.nome = nome;
    this.email = email;
    this.funcao = funcao;
    this.permissao = permissao;
    this.usuario = usuario;
    this.senha = senha;
  }

  static async create(usuarioData) {
    const docRef = db.collection('usuarios').doc();
    const novoUsuario = new Usuario(
      docRef.id,
      usuarioData.nome,
      usuarioData.email,
      usuarioData.funcao,
      usuarioData.permissao,
      usuarioData.usuario,
      usuarioData.senha
    );
    await docRef.set(novoUsuario);
    return novoUsuario;
  }

  static async getById(id) {
    const doc = await db.collection('usuarios').doc(id).get();
    if (!doc.exists) {
      throw new Error('Usuário não encontrado');
    }
    return new Usuario(doc.id, ...Object.values(doc.data()));
  }

  static async update(id, updateData) {
    const docRef = db.collection('usuarios').doc(id);
    await docRef.update(updateData);
    const doc = await docRef.get();
    return new Usuario(doc.id, ...Object.values(doc.data()));
  }

  static async delete(id) {
    await db.collection('usuarios').doc(id).delete();
    return { message: 'Usuário deletado com sucesso' };
  }

  static async getAll() {
    const snapshot = await db.collection('usuarios').get();
    const usuarios = [];
    snapshot.forEach(doc => {
      usuarios.push(new Usuario(doc.id, ...Object.values(doc.data())));
    });
    return usuarios;
  }
}

module.exports = Usuario;
