import React from 'react';
import { prisma } from "@/lib/prisma";

import Feedbacks from './Feedbacks';

const FeedbackSection = async () => {

  const feedback_ = await prisma.feedback.findMany({}).finally(() => {
    prisma.$disconnect();
    // return feedback_
  })
  
  return (
    <>
      <div className='flex flex-col justify-center items-center gap-8 h-[80dvh] mb-7 bg-whiteBG dark:bg-darkBG'>
        <h1 
          className='font-bold text-center m-6 text-3xl lg:text-4xl uppercase bg-gradient-to-r from-secondary to-primaryLighter bg-clip-text text-transparent'>
            
          Veja a opinião dos nossos fornecedores
        </h1>

          <div>
            <Feedbacks feedback_={feedback_} />
          </div>
        
      </div>
    </>
  );
};

export default FeedbackSection;