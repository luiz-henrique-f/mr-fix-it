import { prisma } from "@/lib/prisma";
import ProfileCard from "../search/components/ProfileCard";
import Image from "next/image";
import Script from "next/script";

interface ProfessionalInfoProps {
  categoria: string;
  cidade: string;
  uf: string;
  nome: string;
  cbo: string;
}
const ProfilesParams = async ({ categoria, cidade, uf, nome, cbo }: ProfessionalInfoProps) => {

  const result = await prisma.$queryRaw`SELECT "public"."Prestador".*
                                             , COALESCE((SELECT ROUND(SUM("public"."Comentarios_Prestador"."nota") / COUNT("public"."Comentarios_Prestador"."nota"))
                                                         FROM   "public"."Comentarios_Prestador"
                                                         WHERE  "public"."Comentarios_Prestador"."id_prestador" = "public"."Prestador"."id"), 0) "nota_media"
                                        FROM  "public"."Prestador"
                                        WHERE  CASE WHEN ${uf} = 'undefined' THEN 1
                                                    WHEN "public"."Prestador"."uf" = ${uf} THEN 1
                                               END = 1
                                        AND    CASE WHEN ${cidade} = 'undefined' THEN 1
                                                    WHEN "public"."Prestador"."cidade" = ${cidade} THEN 1
                                               END = 1
                                        AND    CASE WHEN ${categoria} = 'undefined' THEN 1
                                                    WHEN "public"."Prestador"."cod_tipo_categoria" = ${categoria} THEN 1
                                               END = 1
                                        AND    CASE WHEN ${nome} = 'undefined' THEN 1
                                                    WHEN UPPER("public"."Prestador"."nome") like UPPER('%'||${nome}||'%') THEN 1
                                               END = 1
                                        AND    CASE WHEN ${cbo} = 'undefined' THEN 1
                                                    WHEN "public"."Prestador"."cod_cbo" = ${cbo} THEN 1
                                               END = 1
                                        AND    EXISTS( SELECT 1 FROM "public"."users"
                                                       WHERE  "public"."users"."admin" = 'N'
                                                       AND    "public"."users"."id"    = "public"."Prestador"."id_user")
                                        AND    EXISTS ( SELECT 1 FROM "public"."Prestador_Ativo"
                                                        WHERE  current_date BETWEEN TO_DATE("public"."Prestador_Ativo"."data_inicio", 'DD/MM/YYYY') AND TO_DATE("public"."Prestador_Ativo"."data_fim", 'DD/MM/YYYY')
                                                        AND    "public"."Prestador_Ativo"."id_user" = "public"."Prestador"."id_user"
                                                        ORDER  BY TO_DATE("public"."Prestador_Ativo"."data_fim", 'DD/MM/YYYY') desc
                                                        LIMIT  1)
                                        ORDER  BY (COALESCE((SELECT ROUND(SUM("public"."Comentarios_Prestador"."nota") / COUNT("public"."Comentarios_Prestador"."nota"))
                                                             FROM   "public"."Comentarios_Prestador"
                                                             WHERE  "public"."Comentarios_Prestador"."id_prestador" = "public"."Prestador"."id"), 0)) desc`.finally(() => {
    prisma.$disconnect();
  })



  // const json = await (result as any).json();

  return (
    <>
      <div className='flex flex-col 1sm:grid 1sm:grid-cols-2 2md:grid-cols-3 2xl:grid-cols-4 my-8 gap-8'>
        {(result as any).map((prestador: any) => (
          <ProfileCard prestador={prestador} key={prestador.id} nota={prestador.nota_media}/>
        ))}
      </div>

      {result == 0 && (
        <div className="flex justify-center items-center flex-col">
          <span className="text-xl font-mono font-semibold text-center text-grayPrimary dark:text-grayLighter">Não existe nenhum prestador para o filtro selecionado.</span>
          <Image 
            src={'/404 error with portals-pana.png'} 
            alt="error gif"
            width={800}
            height={800}
            className="my-2">
          </Image>
        </div>
      )}
    </>
  );
}
export default ProfilesParams;