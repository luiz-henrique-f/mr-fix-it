-- AlterTable
ALTER TABLE "Prestador" ADD COLUMN     "cod_cbo" TEXT NOT NULL DEFAULT 'ok',
ADD COLUMN     "desc_cbo" TEXT NOT NULL DEFAULT 'ok';

-- CreateTable
CREATE TABLE "Cbo" (
    "id" TEXT NOT NULL,
    "cod_cbo" TEXT NOT NULL,
    "desc_cbo" TEXT NOT NULL,

    CONSTRAINT "Cbo_pkey" PRIMARY KEY ("id")
);
