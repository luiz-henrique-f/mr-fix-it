import { prisma } from "@/lib/prisma";
import FeedbackCard from "./FeedbackCard";

const Feedbacks = async () => {
  // const feedback_ = await prisma.feedback.findMany({})
  return (
    <div className='flex flex-col justify-center items-center h-full'>
      <h1 className='font-bold m-6 text-xl uppercase'>Veja a opinião dos nossos fornecedores</h1>
      <div className="flex w-full items-center justify-center">
        {/* {feedback_.map((feedback) => (
          <FeedbackCard feedback={feedback} key={feedback.id}/>
        ))} */}
        
      </div>
    </div>
  );
}

export default Feedbacks;