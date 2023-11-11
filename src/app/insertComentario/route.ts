import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const req = await request.json();
    
    const { nome, celular, titulo_comentario, comentario, nota, id_user } = req;

    const professional = await prisma.prestador.findFirst({
        where:{
            id_user: id_user
        },
        select: {
            id: true
        }
    })

    console.log(professional?.id)

    await prisma.comentarios_Prestador.create({
      data: {
        id_prestador: professional?.id as any,
        nome: nome,
        celular: celular,
        titulo_comentario: titulo_comentario,
        comentario: comentario,
        nota: nota,
      },
    });

    return new NextResponse(
        JSON.stringify({
            success: true,
        })
    )
}