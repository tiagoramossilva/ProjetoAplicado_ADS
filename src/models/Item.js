const db = require('../config/firebase');

class Item {
  constructor(id, descricao, quantidade, valorUnitario) {
    this.id = id;
    this.descricao = descricao;
    this.quantidade = quantidade;
    this.valorUnitario = valorUnitario;
  }

  static async create(itemData) {
    const docRef = db.collection('itens').doc();
    const novoItem = new Item(
      docRef.id,
      itemData.descricao,
      itemData.quantidade,
      itemData.valorUnitario
    );
    await docRef.set(novoItem);
    return novoItem;
  }

  static async getById(id) {
    const doc = await db.collection('itens').doc(id).get();
    if (!doc.exists) {
      throw new Error('Item não encontrado');
    }
    return new Item(doc.id, ...Object.values(doc.data()));
  }

  static async update(id, updateData) {
    const docRef = db.collection('itens').doc(id);
    await docRef.update(updateData);
    const doc = await docRef.get();
    return new Item(doc.id, ...Object.values(doc.data()));
  }

  static async delete(id) {
    await db.collection('itens').doc(id).delete();
    return { message: 'Item deletado com sucesso' };
  }

  static async getAll() {
    const snapshot = await db.collection('itens').get();
    const itens = [];
    snapshot.forEach(doc => {
      itens.push(new Item(doc.id, ...Object.values(doc.data())));
    });
    return itens;
  }
}

module.exports = Item;
