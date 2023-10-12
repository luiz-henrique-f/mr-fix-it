-- AlterTable
ALTER TABLE "Prestador" ADD COLUMN     "sexo" TEXT NOT NULL DEFAULT 'M',
ALTER COLUMN "tipo_categoria" DROP DEFAULT;
