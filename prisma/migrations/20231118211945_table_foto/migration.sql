-- CreateTable
CREATE TABLE "Foto_Prestador" (
    "id" TEXT NOT NULL,
    "id_prestador" TEXT NOT NULL,
    "publicId" TEXT NOT NULL,
    "format" TEXT NOT NULL,
    "version" TEXT NOT NULL,

    CONSTRAINT "Foto_Prestador_pkey" PRIMARY KEY ("id")
);
