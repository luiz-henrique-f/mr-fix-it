import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const categories = await prisma.tipo_Categoria.findMany({}).finally(() => {
    prisma.$disconnect();
  });

  return new NextResponse(JSON.stringify(categories), { status: 200 });
}