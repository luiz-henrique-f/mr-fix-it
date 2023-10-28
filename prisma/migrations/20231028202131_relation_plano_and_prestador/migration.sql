/*
  Warnings:

  - Added the required column `id_plano` to the `Prestador_Ativo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Prestador_Ativo" ADD COLUMN     "id_plano" TEXT NOT NULL;
