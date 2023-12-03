import { SERVER_API } from "config";
import useAuthHeaders from "hooks/useAuthHeaders";
import { useSession } from "next-auth/react";
import { FormEvent, useRef } from "react";

export function PostQuestionForm({
  callback,
}: {
  callback?: (data: any) => void;
}) {
  const headers = useAuthHeaders();
  const { data: session } = useSession();
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const payload = {
      title: formData.get("title"),
      content: formData.get("content"),
    };
    fetch(`${SERVER_API}/questions`, {
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
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="card bg-base-100 shadow"
    >
      <div className="card-body">
        <h2 className="card-title text-center pb-4">Post a question</h2>
        <input
          type="text"
          name="title"
          placeholder="Title"
          required
          className="input input-bordered w-full"
        />
        <textarea
          name="content"
          className="textarea textarea-bordered w-full"
          placeholder="Content"
        ></textarea>

        <button disabled={!session} type="submit" className="btn btn-neutral">
          {session ? "Publish" : "Login to publish"}
        </button>
      </div>
    </form>
  );
}
