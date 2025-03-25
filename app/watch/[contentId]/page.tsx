"use client";

import { useParams, useRouter } from "next/navigation";
import { AiOutlineArrowLeft } from "react-icons/ai";

import useContentDetails from "@/hooks/useContentDetails";

export default function WatchPage() {
  const router = useRouter();
  const { contentId } = useParams();
  const id = typeof contentId === "string" ? parseInt(contentId, 10) : undefined;
  const { data } = useContentDetails(id);
  const videoKey = data?.videos?.find(video => video.site === "YouTube")?.key;

  if (!data) return null;

  return (
    <div className="h-screen w-screen bg-black">
      <nav className="bg-opacity/70 fixed z-10 flex w-full flex-row items-center gap-8 bg-black p-4">
        <AiOutlineArrowLeft onClick={router.back} className="cursor-pointer text-white" size={40} />

        <p className="text-1xl font-bold text-white md:text-3xl">
          <span className="font-light">Watching: </span>
          {data.title}
        </p>
      </nav>

      {videoKey ? (
        <iframe
          className="h-screen w-screen"
          src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&rel=0&modestbranding=1`}
          title={`${data.title} trailer`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <div className="flex h-screen w-screen items-center justify-center">
          <p className="text-2xl font-bold text-white">No video for this content</p>
        </div>
      )}
    </div>
  );
}
