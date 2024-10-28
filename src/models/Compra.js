// src/models/Compra.js
import { db } from "../config/firebase";
import {
  setDoc,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  collection,
  getDocs,
} from "firebase/firestore";

class Compra {
  constructor(id, dataCompra, dataEmissao, dataEnvio, valorTotal) {
    this.id = id; // Mantém o ID da compra
    this.dataCompra = dataCompra;
    this.dataEmissao = dataEmissao;
    this.dataEnvio = dataEnvio;
    this.valorTotal = valorTotal;
  }

  static async create(compraData) {
    // Log dos dados recebidos
    console.log('Dados recebidos na criação da compra:', compraData); 
  
    // Validação dos campos obrigatórios
    if (!compraData.dataCompra) {
      throw new Error('dataCompra não está definida');
    }
    if (!compraData.dataEmissao) {
      throw new Error('dataEmissao não está definida');
    }
    if (!compraData.dataEnvio) {
      throw new Error('dataEnvio não está definida');
    }
  
    // Formatando as datas
    const formattedDataCompra = formatDateToISO(compraData.dataCompra);
    const formattedDataEmissao = formatDateToISO(compraData.dataEmissao);
    const formattedDataEnvio = formatDateToISO(compraData.dataEnvio);
  
    // Extrai apenas os IDs, se necessário
    const compraParaSalvar = {
      ...compraData,
      dataCompra: formattedDataCompra,
      dataEmissao: formattedDataEmissao,
      dataEnvio: formattedDataEnvio,
      // Removendo IDs que não queremos
      // fornecedor_id: compraData.fornecedor_id?.id || compraData.fornecedor_id,
      // projeto_id: compraData.projeto_id?.id || compraData.projeto_id,
      // cliente_id: compraData.cliente_id?.id || compraData.cliente_id,
      // produto_id: compraData.produto_id?.id || compraData.produto_id,
    };
  
    const docRef = doc(collection(db, 'compras')); // Cria referência para um novo documento
    await setDoc(docRef, { ...compraParaSalvar, id: docRef.id }); // Salva os dados da compra
    
    return new Compra(
      docRef.id,
      compraParaSalvar.dataCompra,
      compraParaSalvar.dataEmissao,
      compraParaSalvar.dataEnvio,
      compraParaSalvar.projeto_id,
      // fornecedor_id: compraParaSalvar.fornecedor_id,
      // cliente_id: compraParaSalvar.cliente_id,
      // produto_id: compraParaSalvar.produto_id,
      compraParaSalvar.valorTotal
    );
  }  

  static async getById(id) {
    const docRef = doc(db, "compras", id);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      throw new Error("Compra não encontrada");
    }
    const data = docSnap.data();
    return new Compra(
      docSnap.id, // Retorna o ID da compra
      data.dataCompra,
      data.dataEmissao,
      data.dataEnvio,
      data.valorTotal
    );
  }

  static async update(id, updateData) {
    const compraParaAtualizar = {
      dataCompra: updateData.dataCompra || null, // Use null se undefined
      dataEmissao: updateData.dataEmissao || null, // Use null se undefined
      dataEnvio: updateData.dataEnvio || null, // Use null se undefined
      valorTotal: updateData.valorTotal || 0, // Use 0 se undefined
    };

    // Adiciona verificação para garantir que os campos necessários estejam definidos
    if (!compraParaAtualizar.dataCompra) {
      throw new Error("dataCompra é obrigatório");
    }
    if (!compraParaAtualizar.dataEmissao) {
      throw new Error("dataEmissao é obrigatório");
    }
    if (!compraParaAtualizar.dataEnvio) {
      throw new Error("dataEnvio é obrigatório");
    }
    if (compraParaAtualizar.valorTotal <= 0) {
      throw new Error("valorTotal deve ser maior que 0");
    }

    const docRef = doc(db, "compras", id);
    await updateDoc(docRef, compraParaAtualizar); // Atualiza o documento no Firestore
    return await this.getById(id); // Retorna a compra atualizada
  }

  static async delete(id) {
    const docRef = doc(db, "compras", id);
    await deleteDoc(docRef); // Deleta o documento do Firestore
    return { message: "Compra deletada com sucesso" };
  }

  static async getAll() {
    const snapshot = await getDocs(collection(db, "compras"));
    const compras = [];
    snapshot.forEach((docSnap) => {
      const data = docSnap.data();
      compras.push(
        new Compra(
          docSnap.id, // Retorna o ID da compra
          data.dataCompra,
          data.dataEmissao,
          data.dataEnvio,
          data.valorTotal
        )
      );
    });
    return compras; // Retorna todas as compras
  }
}

function formatDateToISO(dateStr) {
  const [day, month, year] = dateStr.split("-");
  if (!day || !month || !year) {
    throw new Error("Data não está no formato DD-MM-YYYY");
  }
  return `${year}-${month}-${day}`; // Formato ISO: YYYY-MM-DD
}

export default Compra;
