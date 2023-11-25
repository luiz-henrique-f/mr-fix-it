-- AlterTable
ALTER TABLE "Prestador" ALTER COLUMN "url_foto" SET DEFAULT 'https://avatars.dicebear.com/v2/female/f8a3f576694bbe6737b16d4b3de5aa09.svg';

-- CreateTable
CREATE TABLE "Feedback_Prestador" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "comentario" TEXT NOT NULL,

    CONSTRAINT "Feedback_Prestador_pkey" PRIMARY KEY ("id")
);
