import { db } from '../config/firebase';
import { setDoc, doc, getDoc, updateDoc, deleteDoc, collection, getDocs } from 'firebase/firestore';

class Estoque {
  constructor(id, quantidade, tipo_unitario, produto_id, projeto_id) {
    this.id = id;
    this.quantidade = quantidade;
    this.tipo_unitario = tipo_unitario;
  }

  static async create(estoqueData) {
    const docRef = doc(collection(db, 'estoques')); 
    await setDoc(docRef, { ...estoqueData, id: docRef.id }); 
    return { id: docRef.id, ...estoqueData }; 
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
      ));
    });
    return estoques;
  }
}

export default Estoque;
