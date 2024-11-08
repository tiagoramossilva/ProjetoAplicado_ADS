const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Criação de Usuários
  const usuario1 = await prisma.usuario.create({
    data: {
      nome: "João Silva",
      email: "joao@exemplo.com",
      funcao: "Administrador",
      admin: true,
      usuario: "joao123",
      senha: "senha123",
      observacoes: "Observação do João",
    },
  });

  const usuario2 = await prisma.usuario.create({
    data: {
      nome: "Maria Oliveira",
      email: "maria@exemplo.com",
      funcao: "Gerente",
      admin: false,
      usuario: "maria456",
      senha: "senha456",
      observacoes: "Observação da Maria",
    },
  });

  // Criação de Produtos
  const produto1 = await prisma.produto.create({
    data: {
      nome: "Produto A",
      numero_serie: 12345,
      fabricante: "Fabricante A",
      descricao: "Descrição do Produto A",
      tipo_unitario: "Unidade",
      quantidade: 100,
      andar: "1",
      sala: "101",
      armario: "A1",
    },
  });

  const produto2 = await prisma.produto.create({
    data: {
      nome: "Produto B",
      numero_serie: 67890,
      fabricante: "Fabricante B",
      descricao: "Descrição do Produto B",
      tipo_unitario: "Caixa",
      quantidade: 50,
      andar: "2",
      sala: "202",
      armario: "B2",
    },
  });

  // Criação de Clientes
  const cliente1 = await prisma.cliente.create({
    data: {
      razao_social_cliente: "Cliente A Ltda",
      CNPJ: "00.000.000/0001-00",
      inscricao_estadual: "1234567890",
      endereco: "Rua A, 123",
      bairro: "Centro",
      CEP: "12345-678",
      municipio: "Florianópolis",
      UF: "SC",
      telefone: "(48) 1234-5678",
    },
  });

  const cliente2 = await prisma.cliente.create({
    data: {
      razao_social_cliente: "Cliente B Ltda",
      CNPJ: "11.111.111/0001-11",
      inscricao_estadual: "9876543210",
      endereco: "Rua B, 456",
      bairro: "Centro",
      CEP: "23456-789",
      municipio: "Florianópolis",
      UF: "SC",
      telefone: "(48) 8765-4321",
    },
  });

  // Criação de Fornecedores
  const fornecedor1 = await prisma.fornecedor.create({
    data: {
      razao_social_fornecedor: "Fornecedor A Ltda",
      CNPJ: "22.222.222/0001-22",
      inscricao_estadual: "1122334455",
      endereco: "Rua C, 789",
      bairro: "Industrial",
      CEP: "34567-890",
      municipio: "Florianópolis",
      UF: "SC",
      telefone: "(48) 9876-5432",
    },
  });

  const fornecedor2 = await prisma.fornecedor.create({
    data: {
      razao_social_fornecedor: "Fornecedor B Ltda",
      CNPJ: "33.333.333/0001-33",
      inscricao_estadual: "9988776655",
      endereco: "Rua D, 1011",
      bairro: "Industrial",
      CEP: "45678-901",
      municipio: "Florianópolis",
      UF: "SC",
      telefone: "(48) 5432-1098",
    },
  });

  // Criação de Projetos
  const projeto1 = await prisma.projeto.create({
    data: {
      nome_projeto: "Projeto A",
      responsavel_tecnico: "Eng. João Silva",
      gerente_projeto: "Maria Oliveira",
      cliente_id: cliente1.id,
    },
  });

  const projeto2 = await prisma.projeto.create({
    data: {
      nome_projeto: "Projeto B",
      responsavel_tecnico: "Eng. Carlos Souza",
      gerente_projeto: "Ana Costa",
      cliente_id: cliente2.id,
    },
  });

  // Criação de Compras
  const compra1 = await prisma.compra.create({
    data: {
      data_compra: new Date("2024-11-08T17:04:44.670Z"),
      data_emissao: new Date("2024-11-08T17:04:44.670Z"),
      data_envio: new Date("2024-11-08T17:04:44.670Z"),
      valor_total: 2500,
      produto: {
        connect: {
          id: produto1.id,
        },
      },
      projeto: {
        connect: {
          id: projeto1.id,
        },
      },
      fornecedor: {
        connect: {
          id: fornecedor1.id,
        },
      },
      cliente: {
        connect: {
          id: cliente1.id,
        },
      },
    },
  });

  const compra2 = await prisma.compra.create({
    data: {
      data_compra: new Date("2024-11-09T18:10:15.670Z"),
      data_emissao: new Date("2024-11-09T18:10:15.670Z"),
      data_envio: new Date("2024-11-09T18:10:15.670Z"),
      valor_total: 3500,
      produto: {
        connect: {
          id: produto2.id,
        },
      },
      projeto: {
        connect: {
          id: projeto2.id,
        },
      },
      fornecedor: {
        connect: {
          id: fornecedor2.id,
        },
      },
      cliente: {
        connect: {
          id: cliente2.id,
        },
      },
    },
  });

  console.log("Seed executado com sucesso!");
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
