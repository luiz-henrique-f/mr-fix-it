/*
  Warnings:

  - You are about to drop the column `format` on the `Foto_Prestador` table. All the data in the column will be lost.
  - You are about to drop the column `publicId` on the `Foto_Prestador` table. All the data in the column will be lost.
  - You are about to drop the column `version` on the `Foto_Prestador` table. All the data in the column will be lost.
  - Added the required column `url_foto` to the `Foto_Prestador` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Foto_Prestador" DROP COLUMN "format",
DROP COLUMN "publicId",
DROP COLUMN "version",
ADD COLUMN     "url_foto" TEXT NOT NULL;
