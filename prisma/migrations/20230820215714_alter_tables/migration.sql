/*
  Warnings:

  - You are about to drop the column `email` on the `Prestador` table. All the data in the column will be lost.
  - You are about to drop the column `senha` on the `Prestador` table. All the data in the column will be lost.
  - Added the required column `id_user` to the `Prestador` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Prestador" DROP COLUMN "email",
DROP COLUMN "senha",
ADD COLUMN     "id_user" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Prestador" ADD CONSTRAINT "Prestador_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
