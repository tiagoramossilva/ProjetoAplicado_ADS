// prisma/seed.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Criação de Usuários
  const usuario1 = await prisma.usuario.create({
    data: {
      nome: 'Carla Mendes',
      email: 'carla.mendes@example.com',
      funcao: 'Analista de Sistemas',
      admin: true,
      usuario: 'carla_mendes_01',
      senha: 'senhaSegura123',
    },
  });

  const usuario2 = await prisma.usuario.create({
    data: {
      nome: 'Diego Costa',
      email: 'diego.costa@example.com',
      funcao: 'Desenvolvedor Frontend',
      admin: false,
      usuario: 'diego_costa_02',
      senha: 'senhaSegura123',
    },
  });

  // Criação de Razão Social
  const razaoSocial1 = await prisma.razao_Social.create({
    data: {
      CNPJ: '34.567.890/0001-10',
      inscricao_estadual: '0987654321',
      endereco: 'Rua da Liberdade, 789',
      bairro: 'Centro',
      CEP: 88015-300,
      municipio: 'Florianópolis',
      UF: 'SC',
      telefone: '48 99876-5432',
    },
  });

  // Criação de Clientes
  const cliente1 = await prisma.cliente.create({
    data: {
      razao_social_cliente: 'Alpha Innovations',
      razao_social: {
        connect: { id: razaoSocial1.id },
      },
    },
  });

  const cliente2 = await prisma.cliente.create({
    data: {
      razao_social_cliente: 'Beta Technologies',
      razao_social: {
        connect: { id: razaoSocial1.id },
      },
    },
  });

  // Criação de Fornecedores
  const fornecedor1 = await prisma.fornecedor.create({
    data: {
      razao_social_fornecedor: 'Supply Chain Ltda.',
      razao_social: {
        connect: { id: razaoSocial1.id },
      },
    },
  });

  const fornecedor2 = await prisma.fornecedor.create({
    data: {
      razao_social_fornecedor: 'Logística Rápida S/A',
      razao_social: {
        connect: { id: razaoSocial1.id },
      },
    },
  });

  // Criação de Produtos
  const produto1 = await prisma.produto.create({
    data: {
      nome: 'Tablet Ultra 2024',
      numero_serie: 2001,
      fabricante: 'GigaDevices',
      descricao: 'Tablet de última geração com tela sensível ao toque.',
    },
  });

  const produto2 = await prisma.produto.create({
    data: {
      nome: 'Fone de Ouvido Sem Fio',
      numero_serie: 2002,
      fabricante: 'SoundTech',
      descricao: 'Fones de ouvido com cancelamento de ruído.',
    },
  });

  // Criação de Projetos
  const projeto1 = await prisma.projeto.create({
    data: {
      nome_projeto: 'Implementação de API',
      responsavel_tecnico: 'Júlia Almeida',
      gerente_projeto: 'Roberto Santos',
      cliente: {
        connect: { id: cliente1.id },
      },
    },
  });

  const projeto2 = await prisma.projeto.create({
    data: {
      nome_projeto: 'Desenvolvimento de App Móvel',
      responsavel_tecnico: 'André Lima',
      gerente_projeto: 'Tatiane Freitas',
      cliente: {
        connect: { id: cliente2.id },
      },
    },
  });

  // Criação de Locais de Armazenamento
  const localArmazenamento1 = await prisma.local_Armazenamento.create({
    data: {
      andar: 'Subsolo',
      sala: 'Sala 5',
      armario: 'Armário 3C',
    },
  });

  const localArmazenamento2 = await prisma.local_Armazenamento.create({
    data: {
      andar: '2º Andar',
      sala: 'Sala 301',
      armario: 'Armário 4D',
    },
  });

  // Criação de Estoques
  const estoque1 = await prisma.estoque.create({
    data: {
      quantidade: 75,
      tipo_unitario: 1,
      produto: {
        connect: { id: produto1.id },
      },
      projeto: {
        connect: { id: projeto1.id },
      },
      local_armazenamento: {
        connect: { id: localArmazenamento1.id },
      },
    },
  });

  const estoque2 = await prisma.estoque.create({
    data: {
      quantidade: 40,
      tipo_unitario: 2,
      produto: {
        connect: { id: produto2.id },
      },
      projeto: {
        connect: { id: projeto2.id },
      },
      local_armazenamento: {
        connect: { id: localArmazenamento2.id },
      },
    },
  });

  // Criação de Compras
  const compra1 = await prisma.compra.create({
    data: {
      data_compra: new Date(),
      data_emissao: new Date(),
      data_envio: new Date(),
      valor_total: 2500.00,
      usuario: {
        connect: { id: usuario1.id },
      },
      produto: {
        connect: { id: produto1.id },
      },
      projeto: {
        connect: { id: projeto1.id },
      },
      fornecedor: {
        connect: { id: fornecedor1.id },
      },
      cliente: {
        connect: { id: cliente1.id },
      },
    },
  });

  const compra2 = await prisma.compra.create({
    data: {
      data_compra: new Date(),
      data_emissao: new Date(),
      data_envio: new Date(),
      valor_total: 1200.00,
      usuario: {
        connect: { id: usuario2.id },
      },
      produto: {
        connect: { id: produto2.id },
      },
      projeto: {
        connect: { id: projeto2.id },
      },
      fornecedor: {
        connect: { id: fornecedor2.id },
      },
      cliente: {
        connect: { id: cliente2.id },
      },
    },
  });

  console.log('Banco de dados populado com dados de teste.');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
