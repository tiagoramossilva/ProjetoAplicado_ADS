const db = require('../config/firebase');

class Compra {
  constructor(id, dataCompra, dataInvoice, dataEnvio, projeto, valorTotal) {
    this.id = id;
    this.dataCompra = dataCompra;
    this.dataInvoice = dataInvoice;
    this.dataEnvio = dataEnvio;
    this.projeto = projeto;
    this.valorTotal = valorTotal;
  }

  static async create(compraData) {
    const docRef = db.collection('compras').doc();
    const novaCompra = new Compra(
      docRef.id,
      compraData.dataCompra,
      compraData.dataInvoice,
      compraData.dataEnvio,
      compraData.projeto,
      compraData.valorTotal
    );
    await docRef.set(novaCompra);
    return novaCompra;
  }

  static async getById(id) {
    const doc = await db.collection('compras').doc(id).get();
    if (!doc.exists) {
      throw new Error('Compra não encontrada');
    }
    return new Compra(doc.id, ...Object.values(doc.data()));
  }

  static async update(id, updateData) {
    const docRef = db.collection('compras').doc(id);
    await docRef.update(updateData);
    const doc = await docRef.get();
    return new Compra(doc.id, ...Object.values(doc.data()));
  }

  static async delete(id) {
    await db.collection('compras').doc(id).delete();
    return { message: 'Compra deletada com sucesso' };
  }

  static async getAll() {
    const snapshot = await db.collection('compras').get();
    const compras = [];
    snapshot.forEach(doc => {
      compras.push(new Compra(doc.id, ...Object.values(doc.data())));
    });
    return compras;
  }
}

module.exports = Compra;
