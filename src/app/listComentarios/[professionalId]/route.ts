import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params: { professionalId } }: { params: { professionalId: string } }) {

  console.log({ professionalId });

const professional = await prisma.comentarios_Prestador.findMany({
    where: {
        id_prestador: professionalId
    },
    select:{
        nome: true,
        titulo_comentario: true,
        comentario: true,
        nota: true,
    }
});

  return new NextResponse(JSON.stringify(professional), { status: 200 });
}