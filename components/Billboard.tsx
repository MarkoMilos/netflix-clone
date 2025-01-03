"use client";

import { useCallback } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";

import PlayButton from "@/components/PlayButton";
import useInfoModal from "@/hooks/useInfoModal";
import { Movie } from "@/types";

interface BillboardProps {
  data: Movie | null;
}

export default function Billboard({ data }: BillboardProps) {
  const { openModal } = useInfoModal();

  const handleOpenModal = useCallback(() => {
    if (data) openModal(data?.id);
  }, [openModal, data]);

  if (!data) return null;

  return (
    <div className="absolute h-[56.25vw] w-full">
      {/* Video */}
      <video
        className="h-[56.25vw] w-full object-cover brightness-[60%]"
        src={data?.videoUrl}
        poster={data?.thumbnailUrl}
        autoPlay
        muted
        loop
      />

      {/* Gradient Overlay */}
      <div className="absolute bottom-0 left-0 h-1/5 w-full bg-gradient-to-t from-zinc-900 to-transparent" />

      {/* Meta info */}
      <div className="absolute top-[30%] ml-4 w-full md:ml-16 2xl:top-[40%]">
        <p className="text-1xl h-full w-1/2 font-bold text-white drop-shadow-xl md:text-3xl lg:text-5xl xl:text-6xl">
          {data?.title}
        </p>

        <p className="mt-3 w-[90%] text-[8px] text-white drop-shadow-xl md:mt-8 md:w-4/5 md:text-[10px] lg:w-[65%] lg:text-[12px] xl:w-1/2 xl:text-lg">
          {data?.description}
        </p>

        <div className="mt-3 flex flex-row items-center gap-3 md:mt-4">
          <PlayButton movieId={data?.id} />
          <button
            type="button"
            onClick={handleOpenModal}
            className="flex w-auto flex-row items-center rounded-md bg-white/30 px-2 py-1 text-xs font-semibold text-white transition hover:bg-white/20 md:px-4 md:py-2 lg:text-lg"
          >
            <AiOutlineInfoCircle className="mr-1" />
            More info
          </button>
        </div>
      </div>
    </div>
  );
}
