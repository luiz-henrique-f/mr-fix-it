import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { hash } from 'bcrypt'

export async function POST(req: Request) {
    try{
        const body = await req.json();
        const { email, username, password } = body;

        const existingUserByEmail = await prisma.user_Credentials.findUnique({
            where: {
                email: email,
            }
        });

        if(existingUserByEmail){
            return NextResponse.json({ user: null, message: "User with this email already exists"}, { status: 409})
        }

        const hashedPassword = await hash(password, 10)
        const newUser = await prisma.user_Credentials.create({
            data: {
                username,
                email,
                password: hashedPassword,
            }
        })

        const { password: newUserPassword, ...rest } = newUser

        return NextResponse.json({ user: newUser, message: "User created" }, { status: 201 })
    } catch(error){
        return NextResponse.json({ message: "Someting went wrong" }), { status: 500 }
    }
}