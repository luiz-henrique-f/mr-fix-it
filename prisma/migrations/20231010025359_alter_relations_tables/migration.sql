-- DropForeignKey
ALTER TABLE "Pontuacao_Prestador" DROP CONSTRAINT "Pontuacao_Prestador_id_cliente_fkey";

-- DropForeignKey
ALTER TABLE "Pontuacao_Prestador" DROP CONSTRAINT "Pontuacao_Prestador_id_prestador_fkey";

-- DropForeignKey
ALTER TABLE "Prestador_Ativo" DROP CONSTRAINT "Prestador_Ativo_id_prestador_fkey";
