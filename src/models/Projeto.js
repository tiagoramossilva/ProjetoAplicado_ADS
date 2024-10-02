const db = require('../config/firebase');

class Projeto {
  constructor(id, nome_projeto, responsavel_tecnico, gerente_projeto, cliente_id) {
    this.id = id;
    this.nome_projeto = nome_projeto;
    this.responsavel_tecnico = responsavel_tecnico;
    this.gerente_projeto = gerente_projeto;
    this.cliente_id = cliente_id;
  }

  static async create(projetoData) {
    const docRef = db.collection('projetos').doc();
    const novoProjeto = new Projeto(
      docRef.id,
      projetoData.nome_projeto,
      projetoData.responsavel_tecnico,
      projetoData.gerente_projeto,
      projetoData.cliente_id
    );
    await docRef.set(novoProjeto);
    return novoProjeto;
  }

  static async getById(id) {
    const doc = await db.collection('projetos').doc(id).get();
    if (!doc.exists) {
      throw new Error('Projeto não encontrado');
    }
    const data = doc.data();
    return new Projeto(
      doc.id,
      data.nome_projeto,
      data.responsavel_tecnico,
      data.gerente_projeto,
      data.cliente_id
    );
  }

  static async update(id, updateData) {
    const docRef = db.collection('projetos').doc(id);
    await docRef.update(updateData);
    const doc = await docRef.get();
    const data = doc.data();
    return new Projeto(
      doc.id,
      data.nome_projeto,
      data.responsavel_tecnico,
      data.gerente_projeto,
      data.cliente_id
    );
  }

  static async delete(id) {
    await db.collection('projetos').doc(id).delete();
    return { message: 'Projeto deletado com sucesso' };
  }

  static async getAll() {
    const snapshot = await db.collection('projetos').get();
    const projetos = [];
    snapshot.forEach(doc => {
      const data = doc.data();
      projetos.push(new Projeto(
        doc.id,
        data.nome_projeto,
        data.responsavel_tecnico,
        data.gerente_projeto,
        data.cliente_id
      ));
    });
    return projetos;
  }
}

module.exports = Projeto;
