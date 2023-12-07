'use client'

import { register } from 'swiper/element/bundle';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import FeedbackCard from "./FeedbackCard";

register();
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const Feedbacks = ({feedback_}:any) => {

  // console.log(feedback_)
  
  return (
    <>
      {!feedback_ && (
        <span className="text-base font-medium">Ops! Algo deu errado... </span>
      )}

      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        slidesPerView={1}
        loop={true}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        breakpoints={{
          900:{
            slidesPerView:2,
          },
          1300: {
            slidesPerView: 3,
          }
        }}
        className='w-[95vw] 2md:w-[99vw] 3xl:w-[85vw]'>

        {feedback_.map((feedback:any) => (
          <SwiperSlide key={feedback.id}>
            <div className='flex justify-center items-center my-24'>
              <FeedbackCard feedback={feedback} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

    </>
  );
}

export default Feedbacks;