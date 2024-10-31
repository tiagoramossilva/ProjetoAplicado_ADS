import { db } from '../config/firebase';
import { setDoc, doc, getDoc, updateDoc, deleteDoc, collection, getDocs } from 'firebase/firestore';

class LocalArmazenamento {
  constructor(id, andar, sala, armario, id_produto) {
    this.id = id;
    this.andar = andar;
    this.sala = sala;
    this.armario = armario;
  }

  static async create(localData) {
    const docRef = doc(collection(db, 'locaisArmazenamento')); 
    await setDoc(docRef, { ...localData, id: docRef.id }); 
    return { id: docRef.id, ...localData }; 
  }

  static async getById(id) {
    const docRef = doc(db, 'locaisArmazenamento', id);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      throw new Error('Local de Armazenamento não encontrado');
    }
    const data = docSnap.data();
    return new LocalArmazenamento(
      docSnap.id,
      data.andar,
      data.sala,
      data.armario,
    );
  }

  static async update(id, updateData) {
    const docRef = doc(db, 'locaisArmazenamento', id);
    await updateDoc(docRef, updateData);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data();
    return new LocalArmazenamento(
      docSnap.id,
      data.andar,
      data.sala,
      data.armario,
    );
  }

  static async delete(id) {
    const docRef = doc(db, 'locaisArmazenamento', id);
    await deleteDoc(docRef);
    return { message: 'Local de Armazenamento deletado com sucesso' };
  }

  static async getAll() {
    const snapshot = await getDocs(collection(db, 'locaisArmazenamento'));
    const locais = [];
    snapshot.forEach(docSnap => {
      const data = docSnap.data();
      locais.push(new LocalArmazenamento(
        docSnap.id,
        data.andar,
        data.sala,
        data.armario,
      ));
    });
    return locais;
  }
}

export default LocalArmazenamento;
