const db = require('../config/firebase');
const RazaoSocial = require('./RazaoSocial.js');

class Fornecedor {
  constructor(id, razao_social_id) {
    this.id = id;
    this.razao_social_id = razao_social_id;
  }

  static async create(fornecedorData) {
    const docRef = db.collection('fornecedores').doc();
    const novoFornecedor = new Fornecedor(
      docRef.id,
      fornecedorData.razao_social_id
    );
    await docRef.set(novoFornecedor);
    return novoFornecedor;
  }

  static async getById(id) {
    const doc = await db.collection('fornecedores').doc(id).get();
    if (!doc.exists) {
      throw new Error('Fornecedor não encontrado');
    }
    const data = doc.data();
    return new Fornecedor(doc.id, data.razao_social_id);
  }

  static async update(id, updateData) {
    const docRef = db.collection('fornecedores').doc(id);
    await docRef.update(updateData);
    const doc = await docRef.get();
    const data = doc.data();
    return new Fornecedor(doc.id, data.razao_social_id);
  }

  static async delete(id) {
    await db.collection('fornecedores').doc(id).delete();
    return { message: 'Fornecedor deletado com sucesso' };
  }

  static async getAll() {
    const snapshot = await db.collection('fornecedores').get();
    const fornecedores = [];
    snapshot.forEach(doc => {
      const data = doc.data();
      fornecedores.push(new Fornecedor(doc.id, data.razao_social_id));
    });
    return fornecedores;
  }
}

module.exports = Fornecedor;
