"use client";
import { SERVER_API } from "config";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { PostQuestionForm } from "./PostQuestionForm";
import useAuthHeaders from "../hooks/useAuthHeaders";
import QuestionItem from "./QuestionItem";

const HomePage = () => {
  const { data: session } = useSession();
  const [questions, setQuestions] = useState([]);

  const headers = useAuthHeaders();

  const getQuestions = async () => {
    const res = await fetch(`${SERVER_API}/questions`, {
      headers,
    });

    const response = await res.json();
    setQuestions(response.data.toReversed());
  };

  useEffect(() => {
    if (session) getQuestions();
  }, [session]);

  return (
    <div className="container pt-12">
      <div className="grid md:grid-cols-[3fr,1fr] gap-8">
        {questions.length ? (
          <div className="space-y-4">
            <div className="flex justify-between items-center w-full">
              <h1 className="text-xl font-mono underline uppercase">Feed</h1>

              <button
                onClick={getQuestions}
                className="p-2 text-blue-500 bg-blue-500/10 hover:bg-blue-500/5 transition rounded"
              >
                <RefreshIcon />
              </button>
            </div>

            <div className="grid gap-8">
              {questions.map((q) => (
                <QuestionItem
                  key={q._id}
                  question={q}
                  callback={getQuestions}
                />
              ))}
            </div>
          </div>
        ) : (
          <div>no questions yet!</div>
        )}
        <PostQuestionForm callback={getQuestions} />
      </div>
    </div>
  );
};

export default HomePage;

function RefreshIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M12 20q-3.35 0-5.675-2.325T4 12q0-3.35 2.325-5.675T12 4q1.725 0 3.3.712T18 6.75V4h2v7h-7V9h4.2q-.8-1.4-2.187-2.2T12 6Q9.5 6 7.75 7.75T6 12q0 2.5 1.75 4.25T12 18q1.925 0 3.475-1.1T17.65 14h2.1q-.7 2.65-2.85 4.325T12 20Z"
      />
    </svg>
  );
}
