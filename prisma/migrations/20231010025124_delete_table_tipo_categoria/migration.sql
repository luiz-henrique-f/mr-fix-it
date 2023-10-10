/*
  Warnings:

  - You are about to drop the column `id_categoria` on the `Prestador` table. All the data in the column will be lost.
  - You are about to drop the `Tipo_Categoria` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Prestador" DROP CONSTRAINT "Prestador_id_categoria_fkey";

-- AlterTable
ALTER TABLE "Prestador" DROP COLUMN "id_categoria";

-- DropTable
DROP TABLE "Tipo_Categoria";
