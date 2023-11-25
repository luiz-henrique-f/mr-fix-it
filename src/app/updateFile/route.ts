import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
    const req = await request.json();
    
    const { id_prestador, url_foto} = req;

    await prisma.prestador.updateMany({
      where: {
        id: id_prestador as any
      },
      data: {
        url_foto: url_foto,
      },
    });

    return new NextResponse(
        JSON.stringify({
            success: true,
        })
    )
}