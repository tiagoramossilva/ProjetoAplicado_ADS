import { db } from '../config/firebase';
import { setDoc, doc, getDoc, updateDoc, deleteDoc, collection, getDocs } from 'firebase/firestore';

class Estoque {
  constructor(id, quantidade, tipo_unitario, produto_id, projeto_id) {
    this.id = id;
    this.quantidade = quantidade;
    this.tipo_unitario = tipo_unitario;
    this.produto_id = produto_id;
    this.projeto_id = projeto_id;
  }

  static async create(estoqueData) {
    const docRef = doc(collection(db, 'estoques')); // Cria referência para um novo documento
    await setDoc(docRef, { ...estoqueData, id: docRef.id }); // Salva os dados do estoque
    return { id: docRef.id, ...estoqueData }; // Retorna os dados com o novo ID
  }

  static async getById(id) {
    const docRef = doc(db, 'estoques', id);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      throw new Error('Estoque não encontrado');
    }
    const data = docSnap.data();
    return new Estoque(
      docSnap.id,
      data.quantidade,
      data.tipo_unitario,
      data.produto_id,
      data.projeto_id
    );
  }

  static async update(id, updateData) {
    const docRef = doc(db, 'estoques', id);
    await updateDoc(docRef, updateData);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data();
    return new Estoque(
      docSnap.id,
      data.quantidade,
      data.tipo_unitario,
      data.produto_id,
      data.projeto_id
    );
  }

  static async delete(id) {
    const docRef = doc(db, 'estoques', id);
    await deleteDoc(docRef);
    return { message: 'Estoque deletado com sucesso' };
  }

  static async getAll() {
    const snapshot = await getDocs(collection(db, 'estoques'));
    const estoques = [];
    snapshot.forEach(docSnap => {
      const data = docSnap.data();
      estoques.push(new Estoque(
        docSnap.id,
        data.quantidade,
        data.tipo_unitario,
        data.produto_id,
        data.projeto_id
      ));
    });
    return estoques;
  }
}

export default Estoque;
