-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Produto" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "numero_serie" TEXT NOT NULL,
    "fabricante" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "tipo_unitario" TEXT NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "andar" TEXT NOT NULL,
    "sala" TEXT NOT NULL,
    "armario" TEXT NOT NULL
);
INSERT INTO "new_Produto" ("andar", "armario", "descricao", "fabricante", "id", "nome", "numero_serie", "quantidade", "sala", "tipo_unitario") SELECT "andar", "armario", "descricao", "fabricante", "id", "nome", "numero_serie", "quantidade", "sala", "tipo_unitario" FROM "Produto";
DROP TABLE "Produto";
ALTER TABLE "new_Produto" RENAME TO "Produto";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
