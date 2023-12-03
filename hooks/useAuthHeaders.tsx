"use client";
import { useSession } from "next-auth/react";

export default function useAuthHeaders() {
  const { data: session } = useSession();

  return {
    Authorization: `Bearer ${session?.user.accessToken}`,
  };
}
