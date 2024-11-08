/*
  Warnings:

  - You are about to drop the `Estoque` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Local_Armazenamento` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `andar` to the `Produto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `armario` to the `Produto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantidade` to the `Produto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sala` to the `Produto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipo_unitario` to the `Produto` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Estoque";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Local_Armazenamento";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Produto" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "numero_serie" INTEGER NOT NULL,
    "fabricante" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "tipo_unitario" TEXT NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "andar" TEXT NOT NULL,
    "sala" TEXT NOT NULL,
    "armario" TEXT NOT NULL
);
INSERT INTO "new_Produto" ("descricao", "fabricante", "id", "nome", "numero_serie") SELECT "descricao", "fabricante", "id", "nome", "numero_serie" FROM "Produto";
DROP TABLE "Produto";
ALTER TABLE "new_Produto" RENAME TO "Produto";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
