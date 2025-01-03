"use client";

import { signOut } from "next-auth/react";

import useCurrentUser from "@/hooks/useCurrentUser";

export default function LogoutButton() {
  const { data: user } = useCurrentUser();

  const buttonText = user ? `LOGOUT ${user.name}` : "LOGOUT NO USER";

  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: "/auth" })}
      className="h-10 w-full bg-white text-black"
    >
      {buttonText}
    </button>
  );
}
