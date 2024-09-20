const db = require('../config/firebase');
const Produto = require('./Produto');

class Estoque {
  constructor(id, quantidade, tipo_unitario, produto_id) {
    this.id = id;
    this.quantidade = quantidade;
    this.tipo_unitario = tipo_unitario;
    this.produto_id = produto_id;
  }

  static async create(estoqueData) {
    const docRef = db.collection('estoques').doc();
    const novoEstoque = new Estoque(
      docRef.id,
      estoqueData.quantidade,
      estoqueData.tipo_unitario,
      estoqueData.produto_id
    );
    await docRef.set(novoEstoque);
    return novoEstoque;
  }

  static async getById(id) {
    const doc = await db.collection('estoques').doc(id).get();
    if (!doc.exists) {
      throw new Error('Estoque não encontrado');
    }
    const data = doc.data();
    return new Estoque(
      doc.id,
      data.quantidade,
      data.tipo_unitario,
      data.produto_id
    );
  }

  static async update(id, updateData) {
    const docRef = db.collection('estoques').doc(id);
    await docRef.update(updateData);
    const doc = await docRef.get();
    const data = doc.data();
    return new Estoque(
      doc.id,
      data.quantidade,
      data.tipo_unitario,
      data.produto_id
    );
  }

  static async delete(id) {
    await db.collection('estoques').doc(id).delete();
    return { message: 'Estoque deletado com sucesso' };
  }

  static async getAll() {
    const snapshot = await db.collection('estoques').get();
    const estoques = [];
    snapshot.forEach(doc => {
      const data = doc.data();
      estoques.push(new Estoque(
        doc.id,
        data.quantidade,
        data.tipo_unitario,
        data.produto_id
      ));
    });
    return estoques;
  }
}

module.exports = Estoque;
