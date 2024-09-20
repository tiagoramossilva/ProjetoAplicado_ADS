const db = require('../config/firebase');

class LocalArmazenamento {
  constructor(id, andar, sala, armario) {
    this.id = id;
    this.andar = andar;
    this.sala = sala;
    this.armario = armario;
  }

  static async create(localData) {
    const docRef = db.collection('locaisArmazenamento').doc();
    const novoLocal = new LocalArmazenamento(
      docRef.id,
      localData.andar,
      localData.sala,
      localData.armario
    );
    await docRef.set(novoLocal);
    return novoLocal;
  }

  static async getById(id) {
    const doc = await db.collection('locaisArmazenamento').doc(id).get();
    if (!doc.exists) {
      throw new Error('Local de Armazenamento não encontrado');
    }
    return new LocalArmazenamento(doc.id, ...Object.values(doc.data()));
  }

  static async update(id, updateData) {
    const docRef = db.collection('locaisArmazenamento').doc(id);
    await docRef.update(updateData);
    const doc = await docRef.get();
    return new LocalArmazenamento(doc.id, ...Object.values(doc.data()));
  }

  static async delete(id) {
    await db.collection('locaisArmazenamento').doc(id).delete();
    return { message: 'Local de Armazenamento deletado com sucesso' };
  }

  static async getAll() {
    const snapshot = await db.collection('locaisArmazenamento').get();
    const locais = [];
    snapshot.forEach(doc => {
      locais.push(new LocalArmazenamento(doc.id, ...Object.values(doc.data())));
    });
    return locais;
  }
}

module.exports = LocalArmazenamento;
