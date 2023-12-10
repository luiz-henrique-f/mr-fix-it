import { prisma } from "@/lib/prisma";
import ProfileCard from "../search/components/ProfileCard";

const EmailAutomatic = async () => {

    const result = await prisma.$queryRaw`SELECT (SELECT TO_DATE("public"."Prestador_Ativo"."data_fim", 'DD/MM/YYYY') - current_date
                                                FROM   "public"."Prestador_Ativo"
                                                WHERE  "public"."Prestador_Ativo"."id_user" = "public"."Prestador"."id_user"
                                                ORDER  BY TO_DATE("public"."Prestador_Ativo"."data_fim", 'DD/MM/YYYY') desc
                                                LIMIT  1) "qtd_dias"
                                             , (SELECT "public"."Prestador_Ativo"."data_fim"
                                                FROM   "public"."Prestador_Ativo"
                                                WHERE  "public"."Prestador_Ativo"."id_user" = "public"."Prestador"."id_user"
                                                ORDER  BY TO_DATE("public"."Prestador_Ativo"."data_fim", 'DD/MM/YYYY') desc
                                                LIMIT  1) "data_fim"
                                             , "public"."Prestador"."nome"
                                             , (SELECT "public"."users"."username"
                                                FROM   "public"."users"
                                                WHERE  "public"."users"."id" = "public"."Prestador"."id_user") "email"
                                             , (SELECT "public"."Parametros"."aviso_dias_vencimento"
                                                FROM   "public"."Parametros") "param_dias"
                                        FROM   "public"."Prestador"
                                        WHERE  (SELECT TO_DATE("public"."Prestador_Ativo"."data_fim", 'DD/MM/YYYY') - current_date
                                                FROM   "public"."Prestador_Ativo"
                                                WHERE  "public"."Prestador_Ativo"."id_user" = "public"."Prestador"."id_user"
                                                ORDER  BY TO_DATE("public"."Prestador_Ativo"."data_fim", 'DD/MM/YYYY') desc
                                                LIMIT  1) = (SELECT "public"."Parametros"."aviso_dias_vencimento"
                                                             FROM   "public"."Parametros")`.finally(() => {
                                                prisma.$disconnect();
    })

    const onSubmit = async (email: string, nome: string, data_fim: string) => {

        const response = await fetch("/sendMail", {
            method: "POST",
            body: Buffer.from(
                JSON.stringify({
                    email: email,
                    nome: nome,
                    data_fim: data_fim
                })
            ),
        }
        )
    };

    return (
        <>
            {(result as any).map((prestador: any) => (
                onSubmit(prestador.email, prestador.nome, prestador.data_fim)
            ))}
        </>
    );
}
export default EmailAutomatic;