import { db } from '../config/firebase';
import { setDoc, doc, getDoc, updateDoc, deleteDoc, getDocs, collection } from 'firebase/firestore';

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
    const docRef = doc(collection(db, 'fornecedores')); 
    await setDoc(docRef, { ...fornecedorData, id: docRef.id }); 
    return new Fornecedor(docRef.id, ...Object.values(fornecedorData)); 
  }

  static async getById(id) {
    const docRef = doc(db, 'fornecedores', id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      throw new Error('Fornecedor não encontrado');
    }
    const data = docSnap.data();
    return new Fornecedor(docSnap.id, ...Object.values(data));
  }

  static async update(id, updateData) {
    const docRef = doc(db, 'fornecedores', id);
    await updateDoc(docRef, updateData);
    return await this.getById(id); 
  }

  static async delete(id) {
    const docRef = doc(db, 'fornecedores', id);
    await deleteDoc(docRef);
    return { message: 'Fornecedor deletado com sucesso' };
  }

  static async getAll() {
    const snapshot = await getDocs(collection(db, 'fornecedores'));
    const fornecedores = [];
    snapshot.forEach(doc => {
      const data = doc.data();
      fornecedores.push(new Fornecedor(doc.id, ...Object.values(data)));
    });
    return fornecedores;
  }
}

export default Fornecedor; 
