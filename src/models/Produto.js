const db = require('../config/firebase');

class Produto {
  constructor(id, descricao) {
    this.id = id;
    this.descricao = descricao;
  }

  static async create(produtoData) {
    const docRef = db.collection('produtos').doc();
    const novoProduto = new Produto(
      docRef.id,
      produtoData.descricao
    );
    await docRef.set(novoProduto);
    return novoProduto;
  }

  static async getById(id) {
    const doc = await db.collection('produtos').doc(id).get();
    if (!doc.exists) {
      throw new Error('Produto não encontrado');
    }
    const data = doc.data();
    return new Produto(doc.id, data.descricao);
  }

  static async update(id, updateData) {
    const docRef = db.collection('produtos').doc(id);
    await docRef.update(updateData);
    const doc = await docRef.get();
    const data = doc.data();
    return new Produto(doc.id, data.descricao);
  }

  static async delete(id) {
    await db.collection('produtos').doc(id).delete();
    return { message: 'Produto deletado com sucesso' };
  }

  static async getAll() {
    const snapshot = await db.collection('produtos').get();
    const produtos = [];
    snapshot.forEach(doc => {
      const data = doc.data();
      produtos.push(new Produto(doc.id, data.descricao));
    });
    return produtos;
  }
}

module.exports = Produto;
