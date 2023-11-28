import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
    const req = await request.json();
    
    const { observacao, id_user} = req;

    await prisma.prestador.updateMany({
      where: {
        id_user: id_user as any
      },
      data: {
        observacao: observacao,
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