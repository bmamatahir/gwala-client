"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const AppBar = () => {
  const { data: session } = useSession();
  console.log({ session });

  return (
    <div className="p-4  border-b flex items-center">
      <Link
        href={"/"}
        className="text-blue-700 uppercase font-semibold tracking-wide"
      >
        Gwala
      </Link>
      <div className="ml-auto flex items-center gap-2">
        {session?.user ? (
          <>
            <p className="text-sky-600">{session.user.email}</p>
            <button
              className="btn btn-outline btn-link"
              onClick={() => signOut()}
            >
              Sign Out
            </button>
          </>
        ) : (
          <>
            <button className="btn btn-ghost" onClick={() => signIn()}>
              Sign In
            </button>
            <Link className="btn btn-secondary" href={"/register"}>
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default AppBar;
