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

const professional = await prisma.user.findUnique({
    where: {
        id: userId,
    },
    select:{
        admin: true,
    }
}).finally(() => {
  prisma.$disconnect();
});

  return new NextResponse(JSON.stringify(professional), { status: 200 });
}