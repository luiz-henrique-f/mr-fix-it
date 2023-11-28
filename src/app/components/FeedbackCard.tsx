import { Feedback } from "@prisma/client";
import { ImQuotesLeft } from "react-icons/im";

interface FeedbackProps {
  feedback: Feedback
}

const FeedbackCard = ({ feedback }: FeedbackProps) => {
  return (
    <>
      <div className="flex flex-col w-full max-w-sm drop-shadow-[0px_25px_30px_rgba(120,120,120,0.5)]">
        <div className="relative bg-white rounded-t-xl py-8 flex justify-center items-center">
          <ImQuotesLeft className="absolute top-2 left-2 opacity-20 text-5xl text-grayPrimary" />

          <span className="text-xl text-black font-medium px-6">{feedback.comentario}</span>
        </div>

        <div className="flex flex-col justify-end items-center rounded-b-xl bg-gradient-to-tl from-primary to-primaryLighter py-2">
          <h1 className="text-xl text-white font-bold">{feedback.nome}</h1>
          <p className="text-grayLighter text-sm italic">Prestador em Mr. Fix it</p>
        </div>
      </div>
    </>
  );
};

export default FeedbackCard;