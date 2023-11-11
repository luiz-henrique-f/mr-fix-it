/*
  Warnings:

  - Changed the type of `nota` on the `Comentarios_Prestador` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Comentarios_Prestador" DROP COLUMN "nota",
ADD COLUMN     "nota" INTEGER NOT NULL;
