import ProfessionalRaiting from "@/app/professionals/[professionalid]/components/ProfessionalRaiting";
import { prisma } from "@/lib/prisma";
import { Comentarios_Prestador } from "@prisma/client";

const getCommentsDetails = async (professionalid: string) => {
  const professional = await prisma.comentarios_Prestador.findMany({
      where: {
          id_prestador: professionalid,
      },
  }).finally(() => {
      prisma.$disconnect();
  });

  return professional;
}

const CommentList = async ({ params }: { params: { professionalid: string } }) => {
  const data = await getCommentsDetails(params.professionalid);
  return (
    // <div className="overflow-y-scroll w-full h-[78vh]">
    <div className="">
      {data.map((comments: Comentarios_Prestador) => (
        <ProfessionalRaiting
          key={comments.id}
          name={comments.nome}
          title={comments.titulo_comentario}
          message={comments.comentario}
          valueComment={comments.nota}
          className='shadow-transparent border-transparent rounded-none border-b-grayPrimary/20'
        />
      ))}
    </div>
  );
}

export default CommentList;