import { prisma } from "@/lib/prisma";
import ProfileCard from "../search/components/ProfileCard";

interface ProfessionalInfoProps {
    categoria: string;
    cidade: string;
    uf: string;
}
const ProfilesParams = async ({ categoria, cidade, uf }: ProfessionalInfoProps) => {
    // const prestadores = await prisma.prestador.findMany({
    //     where: {
    //       tipo_categoria: categoria,
    //       uf: uf,
    //       cidade: cidade
    //     }
    //   });

  const result = await prisma.$queryRaw`SELECT * 
                                        FROM   "public"."Prestador"
                                        WHERE  CASE WHEN ${uf} = 'undefined' THEN 1
                                                    WHEN "public"."Prestador"."uf" = ${uf} THEN 1
                                               END = 1
                                        AND    CASE WHEN ${cidade} = 'undefined' THEN 1
                                                    WHEN "public"."Prestador"."cidade" = ${cidade} THEN 1
                                               END = 1
                                        AND    CASE WHEN ${categoria} = 'undefined' THEN 1
                                                    WHEN "public"."Prestador"."tipo_categoria" = ${categoria} THEN 1
                                               END = 1`.finally(() => {
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