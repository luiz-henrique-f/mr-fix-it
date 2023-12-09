import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
    const req = await request.json();
    
    const { nome, cpf_cnpj, cod_tipo_categoria, categoria, celular, uf, cod_cidade, desc_cidade, sexo, observacao, id_user, cbo, desc_cbo} = req;
    // const { nome, cpf_cnpj, id_user, celular, uf, sexo, observacao} = req;

    console.log(id_user)

    await prisma.prestador.update({
      where: {
        id: id_user as any
      },
      data: {
        nome: nome,
        cpf_cnpj: cpf_cnpj,
        cod_tipo_categoria: cod_tipo_categoria,
        tipo_categoria: categoria,
        celular: celular,
        uf: uf,
        cidade: cod_cidade,
        desc_cidade: desc_cidade,
        cod_cbo: cbo,
        desc_cbo: desc_cbo,
        sexo: sexo,
        observacao: observacao,
      },
    });

    return new NextResponse(
        JSON.stringify({
            success: true,
        })
    )
}