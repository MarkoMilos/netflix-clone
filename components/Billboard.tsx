"use client";

import { useCallback } from "react";

import Icon from "@/components/Icons";
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
    <div className="relative w-full">
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
      <div
        style={{
          backgroundImage:
            "linear-gradient(180deg,hsla(0,0%,8%,0) 0%,hsla(0,0%,8%,.15) 15%,hsla(0,0%,8%,.35) 29%,hsla(0,0%,8%,.58) 44%,#141414 68%,#141414 100%)",
        }}
        className="absolute bottom-0 left-0 h-[14.7vw] w-full"
      />

      {/* Meta info */}
      <div className="absolute bottom-[35%] left-[4%] top-0 z-10 flex w-[36%] flex-col justify-end xl:left-[60px]">
        <p className="mb-[1.2vw] flex min-h-[13.2vw] w-full select-none items-end text-[3vw] font-bold text-white drop-shadow-2xl">
          {data?.title}
        </p>

        <p className="w-full select-none text-[1.2vw] text-white drop-shadow-2xl">
          {data?.description}
        </p>

        <div className="mb-4 mt-[1.5vw] flex flex-row gap-4 whitespace-nowrap">
          <PlayButton movieId={data?.id} />
          <button
            type="button"
            onClick={handleOpenModal}
            className="flex cursor-pointer flex-row items-center gap-4 rounded-[4px] bg-gray109/70 py-[0.8rem] pl-8 pr-[2.4rem] hover:bg-gray109/40"
          >
            <Icon name="info" className="size-[2.4rem] text-white" />
            <span className="select-none text-[1.6rem] font-medium text-white">More Info</span>
          </button>
        </div>
      </div>
    </div>
  );
}
