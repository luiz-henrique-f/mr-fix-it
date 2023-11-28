import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
    const req = await request.json();
    
    const { nome, cpf_cnpj, categoria, celular, uf, cidade, desc_cidade, sexo, observacao, id_user, cbo} = req;

    console.log(id_user)

    await prisma.prestador.updateMany({
      where: {
        id_user: id_user as any
      },
      data: {
        nome: nome,
        cpf_cnpj: cpf_cnpj,
        tipo_categoria: categoria,
        celular: celular,
        uf: uf,
        cidade: cidade,
        cod_cbo: cbo,
        desc_cidade: desc_cidade,
        sexo: sexo,
        observacao: observacao,
      },
    }).finally(() => {
      prisma.$disconnect();
  });

    return new NextResponse(
        JSON.stringify({
            success: true,
        })
    )
}