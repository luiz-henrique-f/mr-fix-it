/*
  Warnings:

  - You are about to drop the column `cpf_cnpj` on the `Prestador_Ativo` table. All the data in the column will be lost.
  - You are about to drop the column `nome` on the `Prestador_Ativo` table. All the data in the column will be lost.
  - You are about to drop the `Professional` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Professionals` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `id_prestador` to the `Prestador_Ativo` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Prestador" DROP CONSTRAINT "Prestador_id_user_fkey";

-- AlterTable
ALTER TABLE "Prestador_Ativo" DROP COLUMN "cpf_cnpj",
DROP COLUMN "nome",
ADD COLUMN     "data_hora_ultima_alteracao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "id_prestador" TEXT NOT NULL;

-- DropTable
DROP TABLE "Professional";

-- DropTable
DROP TABLE "Professionals";

-- CreateTable
CREATE TABLE "providers" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "cpf_cnpj" TEXT NOT NULL,

    CONSTRAINT "providers_pkey" PRIMARY KEY ("id")
);
