import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { useSession } from "next-auth/react";

export async function POST(request: Request) {
    try {

        const req = await request.json();

        const { nome, cpf_cnpj, celular, categoria, sexo, uf, cidade, desc_cidade, observacao, id_user } = req;

        const professionals = await prisma.prestador.findMany({
            where: {
                cpf_cnpj: req.cpf_cnpj
            },
            select: {
                id: true
            }
        })

        const professionalUser = await prisma.prestador.findMany({
            where: {
                id_user: id_user
            },
            select: {
                id: true
            }
        })

        // if (professionals.length > 0) {
        //     return new NextResponse(
        //         JSON.stringify({
        //             error: {
        //                 code: "CPF_CNPJ_ALREADY_EXISTS"
        //             }
        //         })
        //     )
        // }

        // if (professionalUser.length > 0) {
        //     return new NextResponse(
        //         JSON.stringify({
        //             error: {
        //                 code: "USER_ALREADY_EXISTS"
        //             }
        //         })
        //     )
        // }

        await prisma.prestador.create({
            data: {
                nome: nome,
                cpf_cnpj: cpf_cnpj,
                celular: celular,
                tipo_categoria: categoria,
                sexo: sexo,
                uf: uf,
                cidade: cidade,
                desc_cidade: desc_cidade,
                observacao: observacao,
                id_user: id_user,
            },
        });

        return new NextResponse(
            JSON.stringify({
                success: true,
            })
        )
    } catch (error) {
        console.log(error)
        return new NextResponse(
            JSON.stringify({
                success: false,
            })
        )

    }
}