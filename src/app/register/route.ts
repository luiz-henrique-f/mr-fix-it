import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt'

export async function POST(request: Request) {
    const req = await request.json();

    const { name, username, password } = req

    // const user = await prisma.user.findUnique({
    //     where: { username: username }
    // });

    // if(user !== null) {
    //     return res.send({ user: null, message: 'User already exists' });
    // }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await prisma.user.create({
        data: {
            name: name,
            username: username,
            password: hashedPassword
        }
    });

    return new NextResponse(
        JSON.stringify({
            success: true,
        })
    )
}