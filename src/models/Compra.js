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
    this.id = id;
    this.dataCompra = dataCompra;
    this.dataEmissao = dataEmissao;
    this.dataEnvio = dataEnvio;
    this.valorTotal = valorTotal;
  }

  static async create(compraData) {
    const docRef = doc(collection(db, 'compras'));
    await setDoc(docRef, { ...compraData, id: docRef.id });
    return new Compra(docRef.id, ...Object.values(compraData));
  }
  
  static async getById(id) {
    const docRef = doc(db, "compras", id);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      throw new Error("Compra não encontrada");
    }
    const data = docSnap.data();
    return new Compra(
      docSnap.id,
      data.dataCompra,
      data.dataEmissao,
      data.dataEnvio,
      data.valorTotal
    );
  }

  static async update(id, updateData) {
    const compraParaAtualizar = {
      dataCompra: updateData.dataCompra ? formatDateToISO(updateData.dataCompra) : null,
      dataEmissao: updateData.dataEmissao ? formatDateToISO(updateData.dataEmissao) : null,
      dataEnvio: updateData.dataEnvio ? formatDateToISO(updateData.dataEnvio) : null,
      valorTotal: updateData.valorTotal || 0,
    };

    // Verificações de campos obrigatórios
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
    await updateDoc(docRef, compraParaAtualizar);
    return await this.getById(id);
  }

  static async delete(id) {
    const docRef = doc(db, "compras", id);
    await deleteDoc(docRef);
    return { message: "Compra deletada com sucesso" };
  }

  static async getAll() {
    const snapshot = await getDocs(collection(db, "compras"));
    const compras = [];
    snapshot.forEach((docSnap) => {
      const data = docSnap.data();
      compras.push(
        new Compra(
          docSnap.id,
          data.dataCompra,
          data.dataEmissao,
          data.dataEnvio,
          data.valorTotal
        )
      );
    });
    return compras;
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
