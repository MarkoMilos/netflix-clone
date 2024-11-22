"use client";

import {signOut} from "next-auth/react";
import useCurrentUser from "@/hooks/useCurrentUser";

export default function LogoutButton() {
    const {data: user} = useCurrentUser();
    console.log("Current user from client component:", user);

    const buttonText = user ? `LOGOUT ${user.name}` : "LOGOUT NO USER";

    return (
        <button
            onClick={() => signOut({callbackUrl: "/auth"})}
            className="h-10 w-full bg-white text-black"
        >
            {buttonText}
        </button>
    );
}
