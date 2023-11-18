import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt'

export async function PUT(request: Request) {
    const req = await request.json();

    const { username, password } = req

    const hashedPassword = await bcrypt.hash(password, 10)

    await prisma.user.updateMany({
      where: {
        username: username as any
      },
      data: {
        password: hashedPassword,
      },
    });

    return new NextResponse(
        JSON.stringify({
            success: true,
        })
    )
}