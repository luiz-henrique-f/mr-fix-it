/*
  Warnings:

  - You are about to drop the column `id_plano` on the `Prestador_Ativo` table. All the data in the column will be lost.
  - Added the required column `tipo_plano` to the `Prestador_Ativo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Prestador_Ativo" DROP COLUMN "id_plano",
ADD COLUMN     "tipo_plano" TEXT NOT NULL;
