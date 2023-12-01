// "use client"

import { prisma } from "@/lib/prisma";

import { register } from 'swiper/element/bundle';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import FeedbackCard from "./FeedbackCard";

register();
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const Feedbacks = async () => {
  const feedback_ = await prisma.feedback.findMany({}).finally(() => {
    prisma.$disconnect();
})

  return (
    <>
      <div className='flex flex-col justify-center items-center gap-8 h-[80dvh] mb-7 bg-whiteBG dark:bg-darkBG'>
        <h1 
          className='font-bold m-6 xl:text-3xl md:text-xl sm:text-base uppercase bg-gradient-to-r from-secondary to-primaryLighter bg-clip-text text-transparent'>
            
          Veja a opinião dos nossos fornecedores
        </h1>

        {!feedback_ && (
          <span className="text-base font-medium">Ops! Algo deu errado... </span>
        )}

        {/* <div className="flex w-full items-center justify-center gap-8"> */}
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          slidesPerView={3}
          navigation
          pagination={{ clickable: true }}
        >
          {feedback_.map((feedback) => (
            <SwiperSlide>

              <FeedbackCard feedback={feedback} key={feedback.id} />
          
            </SwiperSlide>
          ))}
        </Swiper>
        {/* </div> */}

      </div>
    </>
  );
}

export default Feedbacks;