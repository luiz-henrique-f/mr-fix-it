/*
  Warnings:

  - You are about to drop the column `celular` on the `Professionals` table. All the data in the column will be lost.
  - You are about to drop the column `cidade` on the `Professionals` table. All the data in the column will be lost.
  - You are about to drop the column `cpf_cnpj` on the `Professionals` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `Professionals` table. All the data in the column will be lost.
  - You are about to drop the column `id_user` on the `Professionals` table. All the data in the column will be lost.
  - You are about to drop the column `observacao` on the `Professionals` table. All the data in the column will be lost.
  - You are about to drop the column `sexo` on the `Professionals` table. All the data in the column will be lost.
  - You are about to drop the column `tipo_categoria` on the `Professionals` table. All the data in the column will be lost.
  - You are about to drop the column `uf` on the `Professionals` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Professionals" DROP COLUMN "celular",
DROP COLUMN "cidade",
DROP COLUMN "cpf_cnpj",
DROP COLUMN "created_at",
DROP COLUMN "id_user",
DROP COLUMN "observacao",
DROP COLUMN "sexo",
DROP COLUMN "tipo_categoria",
DROP COLUMN "uf";
