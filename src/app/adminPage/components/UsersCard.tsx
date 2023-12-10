import React from 'react';
import { prisma } from "@/lib/prisma";

import UsersInfo from './UsersInfo';

const UsersCard = async () => {


  const prestadores = await prisma.$queryRaw`SELECT "public"."Prestador"."nome"
                                                  , "public"."Prestador"."url_foto"
                                                  , "public"."Prestador"."desc_cidade"
                                                  , "public"."Prestador"."uf"
                                                  , (SELECT "public"."Prestador_Ativo"."data_fim"
                                                     FROM   "public"."Prestador_Ativo"
                                                     WHERE  "public"."Prestador_Ativo"."id_user" = "public"."Prestador"."id_user"
                                                     ORDER  BY TO_DATE("public"."Prestador_Ativo"."data_fim", 'DD/MM/YYYY') desc
                                                     LIMIT  1) "data_fim"
                                                  , CASE WHEN EXISTS (SELECT 1
                                                                      FROM   "public"."Prestador_Ativo"
                                                                      WHERE  current_date BETWEEN TO_DATE("public"."Prestador_Ativo"."data_inicio", 'DD/MM/YYYY') AND TO_DATE("public"."Prestador_Ativo"."data_fim", 'DD/MM/YYYY')
                                                                      AND    "public"."Prestador_Ativo"."id_user" = "public"."Prestador"."id_user"
                                                                      ORDER  BY TO_DATE("public"."Prestador_Ativo"."data_fim", 'DD/MM/YYYY') desc
                                                                      LIMIT  1) THEN 'Ativo' 
                                                         ELSE 'Inativo' 
                                                    END "status"
                                                  , (SELECT "public"."users"."username"
                                                     FROM   "public"."users"
                                                     WHERE  "public"."users"."id" = "public"."Prestador"."id_user") email
                                             FROM   "public"."Prestador"
                                             ORDER  BY (SELECT TO_DATE("public"."Prestador_Ativo"."data_fim", 'DD/MM/YYYY')
                                                        FROM   "public"."Prestador_Ativo"
                                                        WHERE  "public"."Prestador_Ativo"."id_user" = "public"."Prestador"."id_user"
                                                        ORDER  BY TO_DATE("public"."Prestador_Ativo"."data_fim", 'DD/MM/YYYY') desc
                                                        LIMIT  1) asc`.finally(() => {
                                                            prisma.$disconnect();
                                                          })

  return (
    <>
      <div className='flex flex-col gap-2 m-2'>
        <div className='sticky top-0 p-1 px-3 flex items-center justify-between text-lg uppercase font-semibold font-mono text-gray-400 bg-whiteBG dark:bg-darkBG'>

          <div className='flex flex-[10%] items-center justify-start'>
            <p>Ações</p>
          </div>

          <div className='flex flex-[35%] items-center justify-start pl-14'>
            <p>Nome</p>
          </div>

          <div className='flex flex-[35%] items-center justify-center'>
            <p>Data Fim</p>
          </div>

          <div className='flex flex-[20%] items-center justify-center'>
            <p>Status</p>
          </div>

        </div>

        <div className='flex flex-col gap-2 overflow-y-scroll'>
          {(prestadores as any).map((prestador: any) => (
            <UsersInfo 
              nome={prestador.nome}
              url_foto={prestador.url_foto}
              status={prestador.status}
              desc_cidade={prestador.desc_cidade}
              uf={prestador.uf}
              data_fim={prestador.data_fim}
              email={prestador.email}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default UsersCard;