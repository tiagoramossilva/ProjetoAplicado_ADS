const db = require('../config/firebase');

class Fornecedor {
  constructor(id, razao_social, cnpj, inscricao_estadual, endereco, bairro, cep, municipio, uf, telefone) {
    this.id = id;
    this.razao_social = razao_social;
    this.cnpj = cnpj;
    this.inscricao_estadual = inscricao_estadual;
    this.endereco = endereco;
    this.bairro = bairro;
    this.cep = cep;
    this.municipio = municipio;
    this.uf = uf;
    this.telefone = telefone;
  }

  static async create(fornecedorData) {
    const docRef = db.collection('fornecedores').doc();
    const novoFornecedor = new Fornecedor(
      docRef.id,
      fornecedorData.razao_social,
      fornecedorData.cnpj,
      fornecedorData.inscricao_estadual,
      fornecedorData.endereco,
      fornecedorData.bairro,
      fornecedorData.cep,
      fornecedorData.municipio,
      fornecedorData.uf,
      fornecedorData.telefone
    );
    await docRef.set(novoFornecedor);
    return novoFornecedor;
  }

  static async getById(id) {
    const doc = await db.collection('fornecedores').doc(id).get();
    if (!doc.exists) {
      throw new Error('Fornecedor não encontrado');
    }
    return new Fornecedor(doc.id, ...Object.values(doc.data()));
  }

  static async update(id, updateData) {
    const docRef = db.collection('fornecedores').doc(id);
    await docRef.update(updateData);
    const doc = await docRef.get();
    return new Fornecedor(doc.id, ...Object.values(doc.data()));
  }

  static async delete(id) {
    await db.collection('fornecedores').doc(id).delete();
    return { message: 'Fornecedor deletado com sucesso' };
  }

  static async getAll() {
    const snapshot = await db.collection('fornecedores').get();
    const fornecedores = [];
    snapshot.forEach(doc => {
      fornecedores.push(new Fornecedor(doc.id, ...Object.values(doc.data())));
    });
    return fornecedores;
  }
}

module.exports = Fornecedor;
