const db = require('../config/firebase');

class Produto {
  constructor(id, nome, numero_serie, fabricante, descricao, id_local_armazenamento) {
    this.id = id;
    this.nome = nome;
    this.numero_serie = numero_serie;
    this.fabricante = fabricante;
    this.descricao = descricao;   
    this.id_local_armazenamento = id_local_armazenamento;           
  }

  static async create(produtoData) {
    const docRef = db.collection('produtos').doc();
    const novoProduto = new Produto(
      docRef.id,
      produtoData.nome,
      produtoData.numero_serie,
      produtoData.fabricante,
      produtoData.descricao,  
      produtoData.id_local_armazenamento         
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
    return new Produto(
      doc.id,
      data.nome,
      data.numero_serie,
      data.fabricante,
      data.descricao,   
      data.id_local_armazenamento         
    );
  }

  static async update(id, updateData) {
    const docRef = db.collection('produtos').doc(id);
    await docRef.update(updateData);
    const doc = await docRef.get();
    const data = doc.data();
    return new Produto(
      doc.id,
      data.nome,
      data.numero_serie,
      data.fabricante,
      data.descricao,     
      data.id_local_armazenamento         
    );
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
      produtos.push(new Produto(
        doc.id,
        data.nome,
        data.numero_serie,
        data.fabricante,
        data.descricao,   
        data.id_local_armazenamento         
      ));
    });
    return produtos;
  }
}

module.exports = Produto;
