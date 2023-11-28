import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
//   const cbos = await prisma.cbo.findMany({});

  const cbos = await prisma.$queryRaw`SELECT *
                                      FROM   "public"."Cbo"
                                      limit 10`.finally(() => {
                                      prisma.$disconnect()});

  return new NextResponse(JSON.stringify(cbos), { status: 200 });
}



