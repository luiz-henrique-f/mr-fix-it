/*
  Warnings:

  - You are about to drop the column `id_prestador` on the `Tipo_Categoria` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Tipo_Categoria" DROP CONSTRAINT "Tipo_Categoria_id_prestador_fkey";

-- AlterTable
ALTER TABLE "Prestador" ADD COLUMN     "id_categoria" TEXT NOT NULL DEFAULT '2';

-- AlterTable
ALTER TABLE "Tipo_Categoria" DROP COLUMN "id_prestador";

-- AddForeignKey
ALTER TABLE "Prestador" ADD CONSTRAINT "Prestador_id_categoria_fkey" FOREIGN KEY ("id_categoria") REFERENCES "Tipo_Categoria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
