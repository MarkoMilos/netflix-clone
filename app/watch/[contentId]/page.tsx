"use client";

import { useParams, useRouter } from "next/navigation";
import { AiOutlineArrowLeft } from "react-icons/ai";

import useContentDetails from "@/hooks/useContentDetails";

export default function WatchPage() {
  const router = useRouter();
  const { id } = useParams();
  const { data } = useContentDetails(typeof id === "string" ? parseInt(id, 10) : undefined);

  const videoKey = data?.videos?.find(video => video.site === "YouTube")?.key;
  if (!data || !videoKey) return null;

  return (
    <div className="h-screen w-screen bg-black">
      <nav className="bg-opacity/70 fixed z-10 flex w-full flex-row items-center gap-8 bg-black p-4">
        <AiOutlineArrowLeft onClick={router.back} className="cursor-pointer text-white" size={40} />

        <p className="text-1xl font-bold text-white md:text-3xl">
          <span className="font-light">Watching: </span>
          {data.title}
        </p>
      </nav>

      <iframe
        className="h-screen w-screen"
        src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&rel=0&modestbranding=1`}
        title={`${data.title} trailer`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
