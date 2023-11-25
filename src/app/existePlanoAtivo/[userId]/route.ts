import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params: { userId } }: { params: { userId: string } }) {
  const { searchParams } = new URL(request.url);

  console.log({ userId });
  
  if (!userId) {
      return {
          status: 400,
      body: {
        message: "Missing userId",
      },
    };
}

const professional = await prisma.$queryRaw`SELECT "public"."Prestador_Ativo"."id"
                                            FROM  "public"."Prestador_Ativo"
                                            WHERE current_date BETWEEN TO_DATE("public"."Prestador_Ativo"."data_inicio", 'DD/MM/YYYY') AND TO_DATE("public"."Prestador_Ativo"."data_fim", 'DD/MM/YYYY')
                                            AND   "public"."Prestador_Ativo"."id_user" = ${userId}`.finally(() => {
                                            prisma.$disconnect()});



  return new NextResponse(JSON.stringify(professional), { status: 200 });
}