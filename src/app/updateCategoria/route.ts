import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
    const req = await request.json();
    
    const { tipo_categoria, id_user} = req;

    await prisma.prestador.updateMany({
      where: {
        id_user: id_user as any
      },
      data: {
        tipo_categoria: tipo_categoria,
      },
    });

    return new NextResponse(
        JSON.stringify({
            success: true,
        })
    )
}