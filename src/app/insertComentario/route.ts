import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const req = await request.json();
    
    const { nome, celular, titulo_comentario, comentario, nota, id_prestador } = req;

    console.log(id_prestador)

    await prisma.comentarios_Prestador.create({
      data: {
        id_prestador: id_prestador,
        nome: nome,
        celular: celular,
        titulo_comentario: titulo_comentario,
        comentario: comentario,
        nota: nota,
      },
    }).finally(() => {
      prisma.$disconnect();
  });

    return new NextResponse(
        JSON.stringify({
            success: true,
        })
    )
}