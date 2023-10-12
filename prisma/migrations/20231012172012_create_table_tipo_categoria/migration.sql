-- AlterTable
ALTER TABLE "Cliente" ADD COLUMN     "tipo_categoria" TEXT NOT NULL DEFAULT 'Tecnologia';

-- CreateTable
CREATE TABLE "Tipo_Categoria" (
    "id" TEXT NOT NULL,
    "descricao_categoria" TEXT NOT NULL,

    CONSTRAINT "Tipo_Categoria_pkey" PRIMARY KEY ("id")
);
