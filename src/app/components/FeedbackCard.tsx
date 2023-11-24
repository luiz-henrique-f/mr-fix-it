import { Feedback } from "@prisma/client";

interface FeedbackProps {
  feedback: Feedback
}

const FeedbackCard = ({ feedback }: FeedbackProps) => {
  return (
    <div className="w-full max-w-sm relative bg-white rounded-2xl shadow-lg mx-2 mb-4">

      <h1 className="m-2 text-xl font-bold text-center">
        {feedback.nome}
      </h1>

      <div className="text-black font-bold p-4 flex justify-center items-center gap-2">
        avaliação: <span className="text-base font-normal">{feedback.comentario}</span>
      </div>

    </div>
  );
}

export default FeedbackCard;