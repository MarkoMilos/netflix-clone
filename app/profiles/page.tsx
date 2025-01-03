"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import useCurrentUser from "@/hooks/useCurrentUser";

export default function Profiles() {
  const { data: user } = useCurrentUser();
  const router = useRouter();

  return (
    <div className="flex h-full items-center justify-center">
      <div className="flex flex-col">
        <h1 className="text-center text-3xl text-white md:text-6xl">Who is watching?</h1>

        <div className="mt-10 flex items-center justify-center gap-8">
          <button
            type="button"
            onClick={() => {
              router.push("/");
            }}
            className="group flex flex-col items-center"
          >
            <div className="flex size-44 items-center justify-center overflow-hidden rounded-md border-2 border-transparent group-hover:cursor-pointer group-hover:border-white">
              <Image src="/images/profile.png" alt="profile" width={176} height={176} />
            </div>
            <div className="mt-4 text-center text-2xl text-gray-400 group-hover:text-white">
              {user?.name}
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
