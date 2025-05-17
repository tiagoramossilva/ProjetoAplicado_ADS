-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "funcao" TEXT NOT NULL,
    "admin" BOOLEAN NOT NULL,
    "usuario" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "observacoes" TEXT DEFAULT '',

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Produto" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "numero_serie" TEXT NOT NULL,
    "fabricante" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "tipo_unitario" TEXT NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "andar" TEXT NOT NULL,
    "sala" TEXT NOT NULL,
    "armario" TEXT NOT NULL,

    CONSTRAINT "Produto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Compra" (
    "id" SERIAL NOT NULL,
    "data_compra" TIMESTAMP(3) NOT NULL,
    "data_emissao" TIMESTAMP(3) NOT NULL,
    "data_envio" TIMESTAMP(3) NOT NULL,
    "valor_total" DOUBLE PRECISION NOT NULL,
    "produto_id" INTEGER,
    "projeto_id" INTEGER NOT NULL,
    "fornecedor_id" INTEGER NOT NULL,
    "cliente_id" INTEGER NOT NULL,
    "adicionais_id" INTEGER,
    "xml_url" TEXT NOT NULL,
    CONSTRAINT "Compra_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Projeto" (
    "id" SERIAL NOT NULL,
    "nome_projeto" TEXT NOT NULL,
    "responsavel_tecnico" TEXT NOT NULL,
    "gerente_projeto" TEXT NOT NULL,
    "cliente_id" INTEGER,

    CONSTRAINT "Projeto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cliente" (
    "id" SERIAL NOT NULL,
    "razao_social_cliente" TEXT NOT NULL,
    "CNPJ" TEXT NOT NULL,
    "inscricao_estadual" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "bairro" TEXT NOT NULL,
    "CEP" TEXT NOT NULL,
    "municipio" TEXT NOT NULL,
    "UF" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,

    CONSTRAINT "Cliente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Fornecedor" (
    "id" SERIAL NOT NULL,
    "razao_social_fornecedor" TEXT NOT NULL,
    "CNPJ" TEXT NOT NULL,
    "inscricao_estadual" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "bairro" TEXT NOT NULL,
    "CEP" TEXT NOT NULL,
    "municipio" TEXT NOT NULL,
    "UF" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,

    CONSTRAINT "Fornecedor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Adicionais" (
    "id" SERIAL NOT NULL,
    "observacoes" TEXT NOT NULL,

    CONSTRAINT "Adicionais_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_usuario_key" ON "Usuario"("usuario");

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_CNPJ_key" ON "Cliente"("CNPJ");

-- CreateIndex
CREATE UNIQUE INDEX "Fornecedor_CNPJ_key" ON "Fornecedor"("CNPJ");

-- AddForeignKey
ALTER TABLE "Compra" ADD CONSTRAINT "Compra_produto_id_fkey" FOREIGN KEY ("produto_id") REFERENCES "Produto"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Compra" ADD CONSTRAINT "Compra_projeto_id_fkey" FOREIGN KEY ("projeto_id") REFERENCES "Projeto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Compra" ADD CONSTRAINT "Compra_fornecedor_id_fkey" FOREIGN KEY ("fornecedor_id") REFERENCES "Fornecedor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Compra" ADD CONSTRAINT "Compra_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "Cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Compra" ADD CONSTRAINT "Compra_adicionais_id_fkey" FOREIGN KEY ("adicionais_id") REFERENCES "Adicionais"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Projeto" ADD CONSTRAINT "Projeto_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "Cliente"("id") ON DELETE SET NULL ON UPDATE CASCADE;
