import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params: { userId } }: { params: { userId: string } }) {
  
  if (!userId) {
      return {
          status: 400,
      body: {
        message: "Missing userId",
      },
    };
}

const professional = await prisma.user.findMany({
    where: {
        id: userId
    },
    select:{
        username: true
    }
}).finally(() => {
  prisma.$disconnect();
});

  return new NextResponse(JSON.stringify(professional), { status: 200 });
}