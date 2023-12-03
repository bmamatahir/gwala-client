import { useState } from "react";
import { AnswerQuestionForm } from "./AnswerQuestionForm";

export type Question = {
  _id: string;
  title: string;
  content: string;
  answers: Array<{ _id: string; content: string }>;
};

export default function QuestionItem({
  question,
  callback,
}: {
  question: Question;
  callback: (data: unknown) => void;
}) {
  const { _id, title, content, answers = [] } = question;
  const [like, setLike] = useState(false);

  return (
    <div className="relative card shadow">
      <button
        onClick={() => setLike(!like)}
        className="p-2 absolute top-5 right-5 text-red-600 hover:bg-red-500/10 transition rounded"
      >
        <HeartIcon bold={like} />
      </button>
      <div className="card-body">
        <div className="card-title">{title}</div>
        <div>{content}</div>

        <hr />

        {!!answers.length && (
          <ul className="pl-4">
            {answers.toReversed().map((c) => (
              <li key={c._id}>
                {">"} {c.content}
              </li>
            ))}
          </ul>
        )}

        <AnswerQuestionForm question={question} callback={callback} />
      </div>
    </div>
  );
}

function HeartIcon({ bold = false }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 256 256"
    >
      <g fill="currentColor">
        <path
          d="M232 94c0 66-104 122-104 122S24 160 24 94a54 54 0 0 1 54-54c22.59 0 41.94 12.31 50 32c8.06-19.69 27.41-32 50-32a54 54 0 0 1 54 54Z"
          opacity={bold ? "1" : "0"}
        />
        <path d="M178 32c-20.65 0-38.73 8.88-50 23.89C116.73 40.88 98.65 32 78 32a62.07 62.07 0 0 0-62 62c0 70 103.79 126.66 108.21 129a8 8 0 0 0 7.58 0C136.21 220.66 240 164 240 94a62.07 62.07 0 0 0-62-62Zm-50 174.8C109.74 196.16 32 147.69 32 94a46.06 46.06 0 0 1 46-46c19.45 0 35.78 10.36 42.6 27a8 8 0 0 0 14.8 0c6.82-16.67 23.15-27 42.6-27a46.06 46.06 0 0 1 46 46c0 53.61-77.76 102.15-96 112.8Z" />
      </g>
    </svg>
  );
}
