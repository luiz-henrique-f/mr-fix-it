/*
  Warnings:

  - You are about to drop the column `data_hora_ultima_alteracao` on the `Prestador_Ativo` table. All the data in the column will be lost.
  - You are about to drop the column `id_prestador` on the `Prestador_Ativo` table. All the data in the column will be lost.
  - Added the required column `data_fim` to the `Prestador_Ativo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `data_inicio` to the `Prestador_Ativo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_user` to the `Prestador_Ativo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Prestador_Ativo" DROP COLUMN "data_hora_ultima_alteracao",
DROP COLUMN "id_prestador",
ADD COLUMN     "data_fim" TEXT NOT NULL,
ADD COLUMN     "data_inicio" TEXT NOT NULL,
ADD COLUMN     "id_user" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Planos" (
    "id" TEXT NOT NULL,
    "valor" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,

    CONSTRAINT "Planos_pkey" PRIMARY KEY ("id")
);
