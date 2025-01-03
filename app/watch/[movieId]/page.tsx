"use client";

import { useParams, useRouter } from "next/navigation";
import { AiOutlineArrowLeft } from "react-icons/ai";

import useMovie from "@/hooks/useMovie";

export default function WatchPage() {
  const params = useParams();
  const { movieId } = params;
  const { data } = useMovie(movieId as string);
  const router = useRouter();

  return (
    <div className="h-screen w-screen bg-black">
      <nav className="bg-opacity/70 fixed z-10 flex w-full flex-row items-center gap-8 bg-black p-4">
        <AiOutlineArrowLeft onClick={router.back} className="cursor-pointer text-white" size={40} />

        <p className="text-1xl font-bold text-white md:text-3xl">
          <span className="font-light">Watching:</span>
          {data?.title}
        </p>
      </nav>
      <video src={data?.videoUrl} className="size-full" autoPlay controls title={data?.title} />
    </div>
  );
}
