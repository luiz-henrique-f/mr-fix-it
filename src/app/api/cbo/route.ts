import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
//   const cbos = await prisma.cbo.findMany({});

  const cbos = await prisma.$queryRaw`SELECT "public"."Cbo"."cod_cbo"
                                           , "public"."Cbo"."desc_cbo"
                                      FROM   "public"."Cbo"`.finally(() => {
                                      prisma.$disconnect()});

  return new NextResponse(JSON.stringify(cbos), { status: 200 });
}



