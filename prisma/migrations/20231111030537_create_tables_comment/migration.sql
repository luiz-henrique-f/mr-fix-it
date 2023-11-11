/*
  Warnings:

  - You are about to drop the `Cliente` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Pontuacao_Prestador` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Cliente";

-- DropTable
DROP TABLE "Pontuacao_Prestador";

-- CreateTable
CREATE TABLE "Comentarios_Prestador" (
    "id" TEXT NOT NULL,
    "id_prestador" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "celular" TEXT NOT NULL,
    "titulo_comentario" TEXT NOT NULL,
    "comentario" TEXT NOT NULL,
    "nota" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Comentarios_Prestador_pkey" PRIMARY KEY ("id")
);
