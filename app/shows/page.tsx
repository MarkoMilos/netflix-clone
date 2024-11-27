import React from "react";
import authSession from "@/lib/auth/session";

export default async function ShowsPage() {
    const session = await authSession()
    console.log("Session (from server component): ", session);

    return (
        <div className="flex flex-col justify-center items-center min-h-screen text-white">
            <h1 className="text-4xl font-bold">SHOWS</h1>
            <p>Session: {session?.user?.name}</p>
        </div>
    );
}
