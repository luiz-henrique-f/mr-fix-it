/*
  Warnings:

  - You are about to drop the column `data_hora_ultima_alteracao` on the `Prestador_Ativo` table. All the data in the column will be lost.
  - You are about to drop the column `id_prestador` on the `Prestador_Ativo` table. All the data in the column will be lost.
  - Added the required column `cpf_cnpj` to the `Prestador_Ativo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nome` to the `Prestador_Ativo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Prestador_Ativo" DROP COLUMN "data_hora_ultima_alteracao",
DROP COLUMN "id_prestador",
ADD COLUMN     "cpf_cnpj" TEXT NOT NULL,
ADD COLUMN     "nome" TEXT NOT NULL;
