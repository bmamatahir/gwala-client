import useAuthHeaders from "hooks/useAuthHeaders";
import { Question } from "./QuestionItem";
import { useSession } from "next-auth/react";
import { FormEvent, useRef } from "react";
import { SERVER_API } from "config";

export function AnswerQuestionForm({
  question,
  callback,
}: {
  question: Question;
  callback: (data: unknown) => void;
}) {
  const headers = useAuthHeaders();
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const payload = {
      content: formData.get("content"),
    };
    fetch(`${SERVER_API}/questions/${question._id}/answer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: JSON.stringify(payload),
    }).then(async (res) => {
      if (res.ok) {
        callback?.(await res.json());
        formRef.current?.reset();
      }
    });
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="flex gap-4">
      <textarea
        name="content"
        className="textarea textarea-bordered w-full"
        placeholder="Write your thoughts"
      ></textarea>

      <button type="submit" className="btn btn-neutral">
        Post
      </button>
    </form>
  );
}
