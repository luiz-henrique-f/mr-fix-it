import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const req = await request.json();
    
    const { comentario, nome } = req;

    // console.log(id_prestador)

    // const professionalUser = await prisma.prestador.findUnique({
    //     where: {
    //         id: id_prestador
    //     },
    //     select:{
    //         nome: true,
    //         id: false,
    //     }
    // })

    await prisma.feedback_Prestador.create({
      data: {
        nome: nome,
        comentario: comentario,
      },
    });

    return new NextResponse(
        JSON.stringify({
            success: true,
        })
    )
}