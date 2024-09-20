const db = require('../config/firebase');

class Comprador {
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

  static async create(compradorData) {
    const docRef = db.collection('compradores').doc();
    const novoComprador = new Comprador(
      docRef.id,
      compradorData.razao_social,
      compradorData.cnpj,
      compradorData.inscricao_estadual,
      compradorData.endereco,
      compradorData.bairro,
      compradorData.cep,
      compradorData.municipio,
      compradorData.uf,
      compradorData.telefone
    );
    await docRef.set(novoComprador);
    return novoComprador;
  }

  static async getById(id) {
    const doc = await db.collection('compradores').doc(id).get();
    if (!doc.exists) {
      throw new Error('Comprador não encontrado');
    }
    return new Comprador(doc.id, ...Object.values(doc.data()));
  }

  static async update(id, updateData) {
    const docRef = db.collection('compradores').doc(id);
    await docRef.update(updateData);
    const doc = await docRef.get();
    return new Comprador(doc.id, ...Object.values(doc.data()));
  }

  static async delete(id) {
    await db.collection('compradores').doc(id).delete();
    return { message: 'Comprador deletado com sucesso' };
  }

  static async getAll() {
    const snapshot = await db.collection('compradores').get();
    const compradores = [];
    snapshot.forEach(doc => {
      compradores.push(new Comprador(doc.id, ...Object.values(doc.data())));
    });
    return compradores;
  }
}

module.exports = Comprador;
