import { db } from '../config/firebase';
import { setDoc, doc, getDoc, updateDoc, deleteDoc, collection, getDocs } from 'firebase/firestore';

class Cliente {
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

  static async create(clienteData) {
    const docRef = doc(collection(db, 'clientes')); // Cria referência para um novo documento
    await setDoc(docRef, { ...clienteData, id: docRef.id }); // Salva os dados do cliente
    return { id: docRef.id, ...clienteData }; // Retorna os dados com o novo ID
  }

  static async getById(id) {
    const docRef = doc(db, 'clientes', id);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      throw new Error("Cliente não encontrado");
    }
    const data = docSnap.data();
    return new Cliente(docSnap.id, data.razao_social, data.cnpj, data.inscricao_estadual, data.endereco, data.bairro, data.cep, data.municipio, data.uf, data.telefone);
  }

  static async update(id, updateData) {
    const docRef = doc(db, 'clientes', id);
    await updateDoc(docRef, updateData);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data();
    return new Cliente(docSnap.id, data.razao_social, data.cnpj, data.inscricao_estadual, data.endereco, data.bairro, data.cep, data.municipio, data.uf, data.telefone);
  }

  static async delete(id) {
    const docRef = doc(db, 'clientes', id);
    await deleteDoc(docRef);
    return { message: "Cliente deletado com sucesso" };
  }

  static async getAll() {
    const snapshot = await getDocs(collection(db, 'clientes'));
    const clientes = [];
    snapshot.forEach((docSnap) => {
      const data = docSnap.data();
      clientes.push(new Cliente(docSnap.id, data.razao_social, data.cnpj, data.inscricao_estadual, data.endereco, data.bairro, data.cep, data.municipio, data.uf, data.telefone));
    });
    return clientes;
  }
}

export default Cliente;
