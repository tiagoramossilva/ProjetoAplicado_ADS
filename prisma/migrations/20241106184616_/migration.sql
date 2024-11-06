/*
  Warnings:

  - You are about to drop the `Razao_Social` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `CEP` to the `Cliente` table without a default value. This is not possible if the table is not empty.
  - Added the required column `CNPJ` to the `Cliente` table without a default value. This is not possible if the table is not empty.
  - Added the required column `UF` to the `Cliente` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bairro` to the `Cliente` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endereco` to the `Cliente` table without a default value. This is not possible if the table is not empty.
  - Added the required column `inscricao_estadual` to the `Cliente` table without a default value. This is not possible if the table is not empty.
  - Added the required column `municipio` to the `Cliente` table without a default value. This is not possible if the table is not empty.
  - Added the required column `telefone` to the `Cliente` table without a default value. This is not possible if the table is not empty.
  - Added the required column `CEP` to the `Fornecedor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `CNPJ` to the `Fornecedor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `UF` to the `Fornecedor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bairro` to the `Fornecedor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endereco` to the `Fornecedor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `inscricao_estadual` to the `Fornecedor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `municipio` to the `Fornecedor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `telefone` to the `Fornecedor` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Razao_Social_CNPJ_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Razao_Social";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Cliente" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "razao_social_cliente" TEXT NOT NULL,
    "CNPJ" TEXT NOT NULL,
    "inscricao_estadual" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "bairro" TEXT NOT NULL,
    "CEP" INTEGER NOT NULL,
    "municipio" TEXT NOT NULL,
    "UF" TEXT NOT NULL,
    "telefone" TEXT NOT NULL
);
INSERT INTO "new_Cliente" ("id", "razao_social_cliente") SELECT "id", "razao_social_cliente" FROM "Cliente";
DROP TABLE "Cliente";
ALTER TABLE "new_Cliente" RENAME TO "Cliente";
CREATE UNIQUE INDEX "Cliente_CNPJ_key" ON "Cliente"("CNPJ");
CREATE TABLE "new_Fornecedor" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "razao_social_fornecedor" TEXT NOT NULL,
    "CNPJ" TEXT NOT NULL,
    "inscricao_estadual" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "bairro" TEXT NOT NULL,
    "CEP" INTEGER NOT NULL,
    "municipio" TEXT NOT NULL,
    "UF" TEXT NOT NULL,
    "telefone" TEXT NOT NULL
);
INSERT INTO "new_Fornecedor" ("id", "razao_social_fornecedor") SELECT "id", "razao_social_fornecedor" FROM "Fornecedor";
DROP TABLE "Fornecedor";
ALTER TABLE "new_Fornecedor" RENAME TO "Fornecedor";
CREATE UNIQUE INDEX "Fornecedor_CNPJ_key" ON "Fornecedor"("CNPJ");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
