import { db } from '../config/firebase';

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
    const data = doc.data();
    return new Usuario(doc.id, data.nome, data.email, data.funcao, data.permissao, data.usuario, data.senha);
  }

  static async update(id, updateData) {
    const docRef = db.collection('usuarios').doc(id);
    await docRef.update(updateData);
    const doc = await docRef.get();
    const data = doc.data();
    return new Usuario(doc.id, data.nome, data.email, data.funcao, data.permissao, data.usuario, data.senha);
  }

  static async delete(id) {
    await db.collection('usuarios').doc(id).delete();
    return { message: 'Usuário deletado com sucesso' };
  }

  static async getAll() {
    const snapshot = await db.collection('usuarios').get();
    const usuarios = [];
    snapshot.forEach(doc => {
      const data = doc.data();
      usuarios.push(new Usuario(doc.id, data.nome, data.email, data.funcao, data.permissao, data.usuario, data.senha));
    });
    return usuarios;
  }

  static async findByUsuario(usuario) {
    const snapshot = await db.collection('usuarios').where('usuario', '==', usuario).get();
    if (snapshot.empty) {
      return null;
    }
    const doc = snapshot.docs[0];
    const data = doc.data();
    return new Usuario(doc.id, data.nome, data.email, data.funcao, data.permissao, data.usuario, data.senha);
  }


}

export default Usuario;
