import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const req = await request.json();

    const { nome, cpf_cnpj, celular, categoria, sexo, uf, cidade } = req;

    const professionals = await prisma.prestador.findMany({
        where: {
            cpf_cnpj: req.cpf_cnpj
        },
        select:{
            id: true
        }
    })

    const professionalUser = await prisma.prestador.findMany({
        where: {
            id_user: "clnp8dpmc0000w8gglzx14a7h"
        },
        select:{
            id: true
        }
    })

    if (professionals.length > 0) {
        return new NextResponse(
            JSON.stringify({
                error: {
                    code: "CPF_CNPJ_ALREADY_EXISTS"
                }
            })
        )
    }

    if (professionalUser.length > 0) {
        return new NextResponse(
            JSON.stringify({
                error: {
                    code: "USER_ALREADY_EXISTS"
                }
            })
        )
    }

    await prisma.prestador.create({
      data: {
        nome: nome,
        cpf_cnpj: cpf_cnpj,
        celular: celular,
        tipo_categoria: "Tecnologia",
        sexo: sexo,
        uf: uf,
        cidade: cidade,
        observacao: "olá",
        id_user: "clnp8dpmc0000w8gglzx14a7h",
      },
    });

    return new NextResponse(
        JSON.stringify({
            success: true,
        })
    )
}