-- CreateTable
CREATE TABLE "Adicionais" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "observacoes" TEXT NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "compra_id" INTEGER NOT NULL,
    CONSTRAINT "Adicionais_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Adicionais_compra_id_fkey" FOREIGN KEY ("compra_id") REFERENCES "Compra" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Adicionais_usuario_id_key" ON "Adicionais"("usuario_id");
