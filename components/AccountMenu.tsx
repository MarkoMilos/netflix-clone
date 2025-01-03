"use client";

import Image from "next/image";
import { signOut } from "next-auth/react";

import useCurrentUser from "@/hooks/useCurrentUser";

interface AccountMenuProps {
  visible: boolean;
}

export default function AccountMenu({ visible }: AccountMenuProps) {
  const { data: user } = useCurrentUser();

  if (!visible) return null;

  return (
    <div className="absolute right-0 top-14 flex w-56 flex-col border-2 border-gray-800 bg-black py-5">
      <div className="flex flex-col gap-3">
        <div className="group/item flex w-full flex-row items-center gap-3 px-3">
          <Image
            className="w-8 rounded-md"
            src="/images/profile.png"
            alt="profile"
            width="50"
            height="50"
          />
          <p className="text-sm text-white group-hover/item:underline">{user?.name}</p>
        </div>

        <hr className="my-4 h-px border-0 bg-gray-600" />

        <button
          type="button"
          onClick={() => signOut()}
          className="px-3 text-center text-sm text-white hover:underline"
        >
          Sing out
        </button>
      </div>
    </div>
  );
}
