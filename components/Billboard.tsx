"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";

import Icon from "@/components/Icons";
import PlayButton from "@/components/PlayButton";
import useInfoModal from "@/hooks/useInfoModal";
import { Movie, Video } from "@/types";

const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });

interface BillboardProps {
  data: Movie | null;
}

function getRandomMovieTrailer(movie: Movie): Video | null {
  const trailers = movie.videos?.filter(video => video.type === "Trailer");
  if (!trailers || trailers.length === 0) return null;
  return trailers[Math.floor(Math.random() * trailers.length)];
}

export default function Billboard({ data }: BillboardProps) {
  const [opacity, setOpacity] = useState(0); // Start fully hidden
  const [duration, setDuration] = useState(0); // Duration of the video (set by player)
  const fadeInThreshold = 5; // Fade in seconds after video starts
  const fadeOutThreshold = 4; // Fade out seconds before video ends
  const { openModal } = useInfoModal();

  useEffect(() => {
    const timer = setTimeout(() => setOpacity(1), fadeInThreshold * 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleDuration = (dur: number) => {
    setDuration(dur);
  };

  const handleProgress = (state: { playedSeconds: number }) => {
    if (opacity === 1 && state.playedSeconds >= duration - fadeOutThreshold) {
      setOpacity(0);
    }
  };

  const handleOpenModal = useCallback(() => {
    if (data) openModal(data?.id);
  }, [openModal, data]);

  if (!data) return null;
  const trailer = getRandomMovieTrailer(data);

  return (
    <div className="relative size-full overflow-hidden">
      {/* Content backdrop image */}
      <Image
        src={`https://image.tmdb.org/t/p/original${data?.backdrop_path}`}
        alt={data?.title}
        layout="fill"
        objectFit="cover"
      />

      {/*/!* Foreground trailer player *!/*/}
      {/*<ReactPlayer*/}
      {/*  url={`https://www.youtube.com/embed/${trailer?.key}`}*/}
      {/*  width="100%"*/}
      {/*  height="100%"*/}
      {/*  playing*/}
      {/*  muted*/}
      {/*  controls={false} // Hides YouTube controls*/}
      {/*  pip={false} // Disables Picture-in-Picture*/}
      {/*  config={{*/}
      {/*    youtube: {*/}
      {/*      playerVars: {*/}
      {/*        autoplay: 1, // Auto-play*/}
      {/*        modestbranding: 1, // Remove YouTube branding*/}
      {/*        disablekb: 1, // Disable keyboard shortcuts*/}
      {/*        controls: 0, // Hide player controls*/}
      {/*        showinfo: 0, // Hide title & uploader info*/}
      {/*        fs: 0, // Disable fullscreen button*/}
      {/*        rel: 0, // Disable related videos at the end*/}
      {/*        iv_load_policy: 3, // Hide annotations*/}
      {/*        playsinline: 1, // Play inline on mobile*/}
      {/*        mute: 1, // Mute video*/}
      {/*      },*/}
      {/*    },*/}
      {/*  }}*/}
      {/*  onDuration={handleDuration}*/}
      {/*  onProgress={handleProgress}*/}
      {/*  style={{*/}
      {/*    opacity,*/}
      {/*    transition: "opacity 2s ease-in-out",*/}
      {/*    position: "absolute",*/}
      {/*    top: "50%",*/}
      {/*    left: "50%",*/}
      {/*    transform: "translate(-50%, -50%) scale(1.38)", // Scale up slightly*/}
      {/*    width: "110%", // Extend width slightly beyond 100%*/}
      {/*    height: "110%", // Extend height slightly beyond 100%*/}
      {/*    overflow: "hidden",*/}
      {/*  }}*/}
      {/*/>*/}

      {/* Layer preventing player controls */}
      <div className="absolute inset-0" onContextMenu={e => e.preventDefault()} />

      {/* Bottom Gradient Overlay */}
      <div
        style={{
          backgroundImage:
            "linear-gradient(180deg,hsla(0,0%,8%,0) 0%,hsla(0,0%,8%,.15) 15%,hsla(0,0%,8%,.35) 29%,hsla(0,0%,8%,.58) 44%,#141414 68%,#141414 100%)",
        }}
        className="absolute bottom-0 left-0 h-[14.7vw] w-full"
      />

      {/* Meta content info */}
      <div className="absolute bottom-[35%] left-[4%] top-0 z-10 flex w-[36%] flex-col justify-end xl:left-[60px]">
        <p className="mb-[1.2vw] flex min-h-[13.2vw] w-full select-none items-end text-[3vw] font-bold text-white drop-shadow-2xl">
          {data?.title}
        </p>

        <p className="w-full select-none text-[1.2vw] text-white drop-shadow-2xl">
          {data?.overview}
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
