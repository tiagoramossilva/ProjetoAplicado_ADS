import { db } from '../config/firebase';
import { setDoc, doc, getDoc, updateDoc, deleteDoc, collection, getDocs, query, where } from 'firebase/firestore';

class Usuario {
  constructor(id, nome, email, funcao, permissao, usuario, senha) {
    this.id = id;
    this.nome = nome;
    this.email = email;
    this.funcao = funcao;
    this.permissao = permissao;
    this.usuario = usuario;
    this.senha = senha;
  }

  static async create(usuarioData) {
    const docRef = doc(collection(db, 'usuarios')); // Gera um novo ID automaticamente
    await setDoc(docRef, { ...usuarioData, id: docRef.id }); // Salva o usuário no Firestore
    return { id: docRef.id, ...usuarioData }; // Retorna o ID e os dados armazenados
  }

  static async getById(id) {
    const docRef = doc(db, 'usuarios', id);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      throw new Error('Usuário não encontrado');
    }
    const data = docSnap.data();
    return new Usuario(
      docSnap.id,
      data.nome,
      data.email,
      data.funcao,
      data.permissao,
      data.usuario,
      data.senha
    );
  }

  static async update(id, updateData) {
    const docRef = doc(db, 'usuarios', id);
    await updateDoc(docRef, updateData);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data();
    return new Usuario(
      docSnap.id,
      data.nome,
      data.email,
      data.funcao,
      data.permissao,
      data.usuario,
      data.senha
    );
  }

  static async delete(id) {
    const docRef = doc(db, 'usuarios', id);
    await deleteDoc(docRef);
    return { message: 'Usuário deletado com sucesso' };
  }

  static async getAll() {
    const snapshot = await getDocs(collection(db, 'usuarios'));
    const usuarios = [];
    snapshot.forEach(docSnap => {
      const data = docSnap.data();
      usuarios.push(new Usuario(
        docSnap.id,
        data.nome,
        data.email,
        data.funcao,
        data.permissao,
        data.usuario,
        data.senha
      ));
    });
    return usuarios;
  }

  static async findByUsuario(usuario) {
    const q = query(collection(db, 'usuarios'), where('usuario', '==', usuario)); // Usando query
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
      return null;
    }
    const docSnap = snapshot.docs[0];
    const data = docSnap.data();
    return new Usuario(
      docSnap.id,
      data.nome,
      data.email,
      data.funcao,
      data.permissao,
      data.usuario,
      data.senha
    );
  }

  // Função para enviar informações adicionais para o Firestore
  static async infoAdicionais(usuario, observacoes) {
    const docRef = doc(collection(db, 'infoAdicionais')); // Gera um novo ID automaticamente
    const infoAdicionais = {
      usuario,
      ...observacoes, // Desestrutura as informações adicionais recebidas
      createdAt: new Date(), // Adiciona um timestamp de criação
    };

    await setDoc(docRef, infoAdicionais); // Salva as informações adicionais no Firestore
    return { id: docRef.id, ...infoAdicionais }; // Retorna o ID e os dados armazenados
  }
}

export default Usuario;
