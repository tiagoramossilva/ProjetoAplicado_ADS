const db = require('../config/firebase');
const RazaoSocial = require('./RazaoSocial.js');

class Comprador {
  constructor(id, razao_social_id) {
    this.id = id;
    this.razao_social_id = razao_social_id;
  }

  static async create(compradorData) {
    const docRef = db.collection('compradores').doc();
    const novoComprador = new Comprador(
      docRef.id,
      compradorData.razao_social_id
    );
    await docRef.set(novoComprador);
    return novoComprador;
  }

  static async getById(id) {
    const doc = await db.collection('compradores').doc(id).get();
    if (!doc.exists) {
      throw new Error('Comprador não encontrado');
    }
    const data = doc.data();
    return new Comprador(doc.id, data.razao_social_id);
  }

  static async update(id, updateData) {
    const docRef = db.collection('compradores').doc(id);
    await docRef.update(updateData);
    const doc = await docRef.get();
    const data = doc.data();
    return new Comprador(doc.id, data.razao_social_id);
  }

  static async delete(id) {
    await db.collection('compradores').doc(id).delete();
    return { message: 'Comprador deletado com sucesso' };
  }

  static async getAll() {
    const snapshot = await db.collection('compradores').get();
    const compradores = [];
    snapshot.forEach(doc => {
      const data = doc.data();
      compradores.push(new Comprador(doc.id, data.razao_social_id));
    });
    return compradores;
  }
}

module.exports = Comprador;
