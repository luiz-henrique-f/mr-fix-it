import { prisma } from "@/lib/prisma";
import ProfileCard from "../search/components/ProfileCard";

const Profiles = async () => {
  const prestadores = await prisma.prestador.findMany({}).finally(() => {
    prisma.$disconnect();
  });


  return (
    <div className='mx-auto grid grid-cols-4 my-8 gap-8'>
      {prestadores.map((prestador) => (
        <ProfileCard prestador={prestador} id_prestador={prestador.id} key={prestador.id} />
      ))}
    </div>
  );
}

export default Profiles;