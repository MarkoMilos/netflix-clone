"use client";

import Image from "next/image";
import {signOut} from "next-auth/react";
import useCurrentUser from "@/hooks/useCurrentUser";

interface AccountMenuProps {
    visible?: boolean;
}

export default function AccountMenu({visible}: AccountMenuProps) {
    const {data: user} = useCurrentUser()

    if (!visible) return null;

    return (
        <div className="bg-black w-56 absolute top-14 right-0 py-5 flex flex-col border-2 border-gray-800">
            <div className="flex flex-col gap-3">
                <div className="px-3 group/item flex flex-row gap-3 items-center w-full">
                    <Image
                        className="w-8 rounded-md"
                        src="/images/profile.png"
                        alt="profile"
                        width="50"
                        height="50"/>
                    <p className="text-white text-sm group-hover/item:underline">
                        {user?.name}
                    </p>
                </div>

                <hr className="bg-gray-600 border-0 h-px my-4"/>

                <div
                    onClick={() => signOut()}
                    className="px-3 text-center text-white text-sm hover:underline">
                    Sing out
                </div>
            </div>
        </div>
    )
}
