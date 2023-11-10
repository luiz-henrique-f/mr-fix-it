import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
    const req = await request.json();
    
    const { celular, uf, cidade, id_user} = req;

    await prisma.prestador.updateMany({
      where: {
        id_user: id_user as any
      },
      data: {
        celular: celular,
        uf: uf,
        cidade: cidade
      },
    });

    return new NextResponse(
        JSON.stringify({
            success: true,
        })
    )
}