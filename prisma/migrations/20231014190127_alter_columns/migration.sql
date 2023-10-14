/*
  Warnings:

  - You are about to drop the `providers` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Prestador" ALTER COLUMN "sexo" DROP DEFAULT;

-- DropTable
DROP TABLE "providers";
