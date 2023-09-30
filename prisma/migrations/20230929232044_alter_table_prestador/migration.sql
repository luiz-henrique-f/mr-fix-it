/*
  Warnings:

  - You are about to drop the column `data_nascimento` on the `Prestador` table. All the data in the column will be lost.
  - You are about to drop the column `endereco` on the `Prestador` table. All the data in the column will be lost.
  - You are about to drop the column `idade` on the `Prestador` table. All the data in the column will be lost.
  - You are about to drop the column `sexo` on the `Prestador` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Prestador" DROP COLUMN "data_nascimento",
DROP COLUMN "endereco",
DROP COLUMN "idade",
DROP COLUMN "sexo";
