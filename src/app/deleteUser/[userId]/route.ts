import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(request: Request, { params: { userId } }: { params: { userId: string } }) {
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

  const professional = await prisma.prestador.deleteMany({
    where: {
      id_user: userId
    }
  }).finally(() => {
    prisma.$disconnect();
  });

  const user = await prisma.user.delete({
    where: {
      id: userId
    }
  }).finally(() => {
    prisma.$disconnect();
  });

  return new NextResponse(JSON.stringify(professional), { status: 200 });
}