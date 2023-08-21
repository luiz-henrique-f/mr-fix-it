-- CreateTable
CREATE TABLE "Prestador" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "cpf_cnpj" TEXT NOT NULL,
    "idade" INTEGER NOT NULL,
    "sexo" TEXT NOT NULL,
    "data_nascimento" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "celular" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "uf" TEXT NOT NULL,
    "observacao" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Prestador_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tipo_Categoria" (
    "id" TEXT NOT NULL,
    "id_prestador" TEXT NOT NULL,
    "descricao_categoria" TEXT NOT NULL,

    CONSTRAINT "Tipo_Categoria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Prestador_Ativo" (
    "id" TEXT NOT NULL,
    "id_prestador" TEXT NOT NULL,
    "data_hora_ultima_alteracao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Prestador_Ativo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pontuacao_Prestador" (
    "id" TEXT NOT NULL,
    "id_prestador" TEXT NOT NULL,
    "id_cliente" TEXT NOT NULL,
    "pontuacao" TEXT NOT NULL,

    CONSTRAINT "Pontuacao_Prestador_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cliente" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "cpf_cnpj" TEXT NOT NULL,
    "idade" INTEGER NOT NULL,
    "sexo" TEXT NOT NULL,
    "data_nascimento" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "celular" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "uf" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Cliente_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Tipo_Categoria" ADD CONSTRAINT "Tipo_Categoria_id_prestador_fkey" FOREIGN KEY ("id_prestador") REFERENCES "Prestador"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prestador_Ativo" ADD CONSTRAINT "Prestador_Ativo_id_prestador_fkey" FOREIGN KEY ("id_prestador") REFERENCES "Prestador"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pontuacao_Prestador" ADD CONSTRAINT "Pontuacao_Prestador_id_prestador_fkey" FOREIGN KEY ("id_prestador") REFERENCES "Prestador"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pontuacao_Prestador" ADD CONSTRAINT "Pontuacao_Prestador_id_cliente_fkey" FOREIGN KEY ("id_cliente") REFERENCES "Cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
