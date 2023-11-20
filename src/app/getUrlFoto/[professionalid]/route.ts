import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params: { professionalid } }: { params: { professionalid: string } }) {
  
  if (!professionalid) {
      return {
          status: 400,
      body: {
        message: "Missing userId",
      },
    };
}

const professional = await prisma.foto_Prestador.findMany({
    where: {
        id_prestador: professionalid
    },
    select:{
        url_foto: true
    }
});

  return new NextResponse(JSON.stringify(professional), { status: 200 });
}