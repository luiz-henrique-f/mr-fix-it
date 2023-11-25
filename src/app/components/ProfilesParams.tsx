import { prisma } from "@/lib/prisma";
import ProfileCard from "../search/components/ProfileCard";

interface ProfessionalInfoProps {
    categoria: string;
    cidade: string;
    uf: string;
    nome: string;
}
const ProfilesParams = async ({ categoria, cidade, uf, nome }: ProfessionalInfoProps) => {
    // const prestadores = await prisma.prestador.findMany({
    //     where: {
    //       tipo_categoria: categoria,
    //       uf: uf,
    //       cidade: cidade
    //     }
    //   });

  const result = await prisma.$queryRaw`SELECT * 
                                        FROM  "public"."Prestador",
                                              (
                                                SELECT
                                                  "public"."Prestador"."id",
                                                  ROUND(
                                                    SUM("public"."Comentarios_Prestador"."nota") / COUNT("public"."Comentarios_Prestador"."nota")
                                                  ) qtd
                                                FROM
                                                  "public"."Comentarios_Prestador",
                                                  "public"."Prestador"
                                                WHERE
                                                  "public"."Prestador"."id" = "public"."Comentarios_Prestador"."id_prestador"
                                                GROUP BY
                                                  "public"."Prestador"."id"
                                              ) tmp
                                        WHERE   tmp.id = "public"."Prestador"."id"
                                        AND    CASE WHEN ${uf} = 'undefined' THEN 1
                                                    WHEN "public"."Prestador"."uf" = ${uf} THEN 1
                                               END = 1
                                        AND    CASE WHEN ${cidade} = 'undefined' THEN 1
                                                    WHEN "public"."Prestador"."cidade" = ${cidade} THEN 1
                                               END = 1
                                        AND    CASE WHEN ${categoria} = 'undefined' THEN 1
                                                    WHEN "public"."Prestador"."tipo_categoria" = ${categoria} THEN 1
                                               END = 1
                                        AND    CASE WHEN ${nome} = 'undefined' THEN 1
                                                    WHEN UPPER("public"."Prestador"."nome") like UPPER('%'||${nome}||'%') THEN 1
                                               END = 1
                                        ORDER BY
                                          tmp.qtd desc`.finally(() => {
                                            prisma.$disconnect();
                                          })

  return (
    <div className='mx-auto grid grid-cols-4 my-8 gap-8'>
      {(result as any).map((prestador: any) => (
        <ProfileCard prestador={prestador} key={prestador.id} />
      ))}
    </div>
  );
}
export default ProfilesParams;