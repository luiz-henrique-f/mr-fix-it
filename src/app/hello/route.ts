import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const trips = await prisma.prestador.findMany();

  return new NextResponse(JSON.stringify(trips), { status: 200 });
}