import { prisma } from "@/lib/prisma";
import FeedbackCard from "./FeedbackCard";

const Feedbacks = async () => {
  const feedback_ = await prisma.feedback.findMany({}).finally(() => {
    prisma.$disconnect();
})

  return (
    <div className='flex flex-col justify-center items-center h-full mb-7'>
      <h1 className='font-bold m-6 xl:text-3xl md:text-xl sm:text-base uppercase'>Veja a opinião dos nossos fornecedores</h1>

      {!feedback_ && (
        <span className="text-base font-medium">Ops! Algo deu errado... </span>
      )}

      <div className="flex w-full items-center justify-center gap-8">

        {feedback_.map((feedback) => (
          <FeedbackCard feedback={feedback} key={feedback.id} />
        ))}


      </div>

    </div>
  );
}

export default Feedbacks;