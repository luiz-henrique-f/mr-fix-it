import { prisma } from "@/lib/prisma";
import ProfileCard from "../search/components/ProfileCard";

const Profiles = async () => {
  const prestadores = await prisma.prestador.findMany({}).finally(() => {
    prisma.$disconnect();
  });
  
  return (
    <div className='flex flex-col 1sm:grid 1sm:grid-cols-2 2md:grid-cols-3 2xl:grid-cols-4 my-8 gap-8'>
      {prestadores.map((prestador) => (
        <ProfileCard prestador={prestador} key={prestador.id} nota={0} />
      ))}
    </div>
  );
}

export default Profiles;