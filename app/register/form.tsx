"use client";

import { SERVER_API } from "config";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { FormEvent } from "react";

export default function Form() {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const payload = {
      email: formData.get("email"),
      password: formData.get("password"),
    };
    fetch(`${SERVER_API}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }).then(async (res) => {
      if (res.ok) {
        await signIn("credentials", {
          ...payload,
          redirect: true,
          callbackUrl: "/",
        });
      } else {
        const error = await res.json();
        alert(error.message);
      }
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="card w-96 bg-base-100 shadow-xl mx-auto mt-10"
    >
      <div className="card-body">
        <h2 className="card-title text-center pb-4">Sign up!</h2>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          className="input input-bordered w-full"
        />
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          className="input input-bordered w-full"
        />
        <div className="text-end">
          Already have an account?{" "}
          <Link className="link" href={"/api/auth/signin"}>
            Sign in
          </Link>
        </div>
        <button type="submit" className="btn btn-secondary">
          Register
        </button>
      </div>
    </form>
  );
}
