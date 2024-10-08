const db = require("../config/firebase.js");

class Cliente {
  constructor(id, razao_social, razao_social_id) {
    this.id = id;
    this.razao_social = razao_social;
    this.razao_social_id = razao_social_id;
  }

  static async create(clienteData) {
    const docRef = db.collection("clientes").doc();
    const novoCliente = new Cliente(
      docRef.id,
      clienteData.razao_social,
      clienteData.razao_social_id
    );
    await docRef.set(novoCliente);
    return novoCliente;
  }

  static async getById(id) {
    const doc = await db.collection("clientes").doc(id).get();
    if (!doc.exists) {
      throw new Error("Cliente não encontrado");
    }
    const data = doc.data();
    return new Cliente(doc.id, data.razao_social_id);
  }

  static async update(id, updateData) {
    const docRef = db.collection("clientes").doc(id);
    await docRef.update(updateData);
    const doc = await docRef.get();
    const data = doc.data();
    return new Cliente(doc.id, data.razao_social, data.razao_social_id);
  }

  static async delete(id) {
    await db.collection("clientes").doc(id).delete();
    return { message: "Cliente deletado com sucesso" };
  }

  static async getAll() {
    const snapshot = await db.collection("clientes").get();
    const clientes = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      clientes.push(new Cliente(doc.id, data.razao_social, data.razao_social_id));
    });
    return clientes;
  }
}

module.exports = Cliente;
