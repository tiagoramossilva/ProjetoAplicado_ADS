import { db } from '../config/firebase';
import { setDoc, doc, getDoc, updateDoc, deleteDoc, collection, getDocs } from 'firebase/firestore';

class Projeto {
  constructor(id, nome_projeto, responsavel_tecnico, gerente_projeto, cliente_id) {
    this.id = id;
    this.nome_projeto = nome_projeto;
    this.responsavel_tecnico = responsavel_tecnico;
    this.gerente_projeto = gerente_projeto;
    this.cliente_id = cliente_id;
  }

  static async create(projetoData) {
    const docRef = doc(collection(db, 'projetos')); 
    await setDoc(docRef, { ...projetoData, id: docRef.id }); 
    return { id: docRef.id, ...projetoData }; 
  }

  static async getById(id) {
    const docRef = doc(db, 'projetos', id);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      throw new Error('Projeto não encontrado');
    }
    const data = docSnap.data();
    return new Projeto(
      docSnap.id,
      data.nome_projeto,
      data.responsavel_tecnico,
      data.gerente_projeto,
      data.cliente_id
    );
  }

  static async update(id, updateData) {
    const docRef = doc(db, 'projetos', id);
    await updateDoc(docRef, updateData);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data();
    return new Projeto(
      docSnap.id,
      data.nome_projeto,
      data.responsavel_tecnico,
      data.gerente_projeto,
      data.cliente_id
    );
  }

  static async delete(id) {
    const docRef = doc(db, 'projetos', id);
    await deleteDoc(docRef);
    return { message: 'Projeto deletado com sucesso' };
  }

  static async getAll() {
    const snapshot = await getDocs(collection(db, 'projetos'));
    const projetos = [];
    snapshot.forEach(docSnap => {
      const data = docSnap.data();
      projetos.push(new Projeto(
        docSnap.id,
        data.nome_projeto,
        data.responsavel_tecnico,
        data.gerente_projeto,
        data.cliente_id
      ));
    });
    return projetos;
  }
}

export default Projeto;
