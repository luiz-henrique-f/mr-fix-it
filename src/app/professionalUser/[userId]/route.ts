import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params: { userId } }: { params: { userId: string } }) {

  console.log({ userId });
  
  if (!userId) {
      return {
          status: 400,
      body: {
        message: "Missing userId",
      },
    };
}

const professional = await prisma.prestador.findMany({
    where: {
        id_user: userId
    },
    select:{
        id: true,
        nome: true,
        celular: true,
        tipo_categoria: true,
        observacao: true,
        cidade: true,
        uf: true,
    }
}).finally(() => {
  prisma.$disconnect();
});

  return new NextResponse(JSON.stringify(professional), { status: 200 });
}