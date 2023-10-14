-- CreateTable
CREATE TABLE "Professionals" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "cpf_cnpj" TEXT NOT NULL,
    "celular" TEXT NOT NULL,
    "sexo" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "uf" TEXT NOT NULL,
    "observacao" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tipo_categoria" TEXT NOT NULL,
    "id_user" TEXT NOT NULL,

    CONSTRAINT "Professionals_pkey" PRIMARY KEY ("id")
);
