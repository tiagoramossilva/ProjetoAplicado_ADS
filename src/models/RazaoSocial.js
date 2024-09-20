const db = require('../config/firebase');

class RazaoSocial {
  constructor(id, cnpj, inscricao_estadual, endereco, bairro, cep, municipio, uf, telefone) {
    this.id = id;
    this.cnpj = cnpj;
    this.inscricao_estadual = inscricao_estadual;
    this.endereco = endereco;
    this.bairro = bairro;
    this.cep = cep;
    this.municipio = municipio;
    this.uf = uf;
    this.telefone = telefone;
  }

  static async create(razaoData) {
    const docRef = db.collection('razoesSociais').doc();
    const novaRazao = new RazaoSocial(
      docRef.id,
      razaoData.cnpj,
      razaoData.inscricao_estadual,
      razaoData.endereco,
      razaoData.bairro,
      razaoData.cep,
      razaoData.municipio,
      razaoData.uf,
      razaoData.telefone
    );
    await docRef.set(novaRazao);
    return novaRazao;
  }

  static async getById(id) {
    const doc = await db.collection('razoesSociais').doc(id).get();
    if (!doc.exists) {
      throw new Error('Razão Social não encontrada');
    }
    const data = doc.data();
    return new RazaoSocial(
      doc.id,
      data.cnpj,
      data.inscricao_estadual,
      data.endereco,
      data.bairro,
      data.cep,
      data.municipio,
      data.uf,
      data.telefone
    );
  }

  static async update(id, updateData) {
    const docRef = db.collection('razoesSociais').doc(id);
    await docRef.update(updateData);
    const doc = await docRef.get();
    const data = doc.data();
    return new RazaoSocial(
      doc.id,
      data.cnpj,
      data.inscricao_estadual,
      data.endereco,
      data.bairro,
      data.cep,
      data.municipio,
      data.uf,
      data.telefone
    );
  }

  static async delete(id) {
    await db.collection('razoesSociais').doc(id).delete();
    return { message: 'Razão Social deletada com sucesso' };
  }

  static async getAll() {
    const snapshot = await db.collection('razoesSociais').get();
    const razoes = [];
    snapshot.forEach(doc => {
      const data = doc.data();
      razoes.push(new RazaoSocial(
        doc.id,
        data.cnpj,
        data.inscricao_estadual,
        data.endereco,
        data.bairro,
        data.cep,
        data.municipio,
        data.uf,
        data.telefone
      ));
    });
    return razoes;
  }
}

module.exports = RazaoSocial;
