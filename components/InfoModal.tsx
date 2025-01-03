"use client";

import { useCallback, useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

import FavouriteButton from "@/components/FavouriteButton";
import PlayButton from "@/components/PlayButton";
import useInfoModal from "@/hooks/useInfoModal";
import useMovie from "@/hooks/useMovie";

export default function InfoModal() {
  const [isVisible, setIsVisible] = useState(false);

  const { movieId, isOpen, closeModal } = useInfoModal();
  const { data } = useMovie(movieId as string);

  useEffect(() => {
    if (isOpen) {
      // Delay setting isVisible to true to trigger animation
      const timer = setTimeout(() => setIsVisible(true), 10);
      return () => clearTimeout(timer); // Cleanup timer on unmount
    } else {
      setIsVisible(false); // Trigger exit animation
      return () => {}; // No cleanup needed
    }
  }, [isOpen]);

  const handleClose = useCallback(() => {
    // Set visible to false to trigger the animation
    setIsVisible(false);
    // Call close that will set visible to false after 300ms to avoid early unmount
    setTimeout(() => {
      closeModal();
    }, 300);
  }, [closeModal]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-black/80 transition duration-300">
      <div className="relative mx-auto w-auto max-w-3xl overflow-hidden rounded-md">
        <div
          className={` ${isVisible ? "scale-100" : "scale-0"} relative flex-auto bg-zinc-900 drop-shadow-md duration-300`}
        >
          <div className="relative h-96">
            <video
              className="size-full object-cover brightness-[60%]"
              autoPlay
              muted
              loop
              poster={data?.thumbnailUrl}
              src={data?.videoUrl}
            />

            <button
              type="button"
              onClick={handleClose}
              className="bg-opacity/70 absolute right-3 top-3 flex size-10 cursor-pointer items-center justify-center rounded-full bg-black"
            >
              <AiOutlineClose size={20} className="text-white" />
            </button>

            <div className="absolute bottom-[10%] left-10">
              <p className="mb-8 h-full text-3xl font-bold text-white md:text-4xl lg:text-5xl">
                {data?.title}
              </p>
              <div className="flex flex-row items-center gap-4">
                <PlayButton movieId={data?.id || ""} />
                <FavouriteButton movieId={data?.id || ""} />
              </div>
            </div>
          </div>

          <div className="px-12 py-8">
            <p className="text-lg font-semibold text-green-400">New</p>
            <p className="text-lg text-white">{data?.duration}</p>
            <p className="text-lg text-white">{data?.genre}</p>
            <p className="text-lg text-white">{data?.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
