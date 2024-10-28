import { db } from '../config/firebase';
import { setDoc, doc, getDoc, updateDoc, deleteDoc, collection, getDocs } from 'firebase/firestore';

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
    const docRef = doc(collection(db, 'produtos')); // Cria referência para um novo documento
    await setDoc(docRef, { ...produtoData, id: docRef.id }); // Salva os dados do produto
    return { id: docRef.id, ...produtoData }; // Retorna os dados com o novo ID
  }

  static async getById(id) {
    const docRef = doc(db, 'produtos', id);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      throw new Error('Produto não encontrado');
    }
    const data = docSnap.data();
    return new Produto(
      docSnap.id,
      data.nome,
      data.numero_serie,
      data.fabricante,
      data.descricao,
      data.id_local_armazenamento
    );
  }

  static async update(id, updateData) {
    const docRef = doc(db, 'produtos', id);
    await updateDoc(docRef, updateData);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data();
    return new Produto(
      docSnap.id,
      data.nome,
      data.numero_serie,
      data.fabricante,
      data.descricao,
      data.id_local_armazenamento
    );
  }

  static async delete(id) {
    const docRef = doc(db, 'produtos', id);
    await deleteDoc(docRef);
    return { message: 'Produto deletado com sucesso' };
  }

  static async getAll() {
    const snapshot = await getDocs(collection(db, 'produtos'));
    const produtos = [];
    snapshot.forEach(docSnap => {
      const data = docSnap.data();
      produtos.push(new Produto(
        docSnap.id,
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

export default Produto;
