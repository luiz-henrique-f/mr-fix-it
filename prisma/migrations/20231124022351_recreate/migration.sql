/*
  Warnings:

  - You are about to drop the `Feedback_Prestador` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Feedback_Prestador";

-- CreateTable
CREATE TABLE "Feedback" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "comentario" TEXT NOT NULL,

    CONSTRAINT "Feedback_pkey" PRIMARY KEY ("id")
);
