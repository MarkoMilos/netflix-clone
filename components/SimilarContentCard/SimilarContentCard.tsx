import Link from "next/link";

import Icon from "@/components/Icons";
import MyListButton from "@/components/MyListButton";
import { getBackdropUrl } from "@/lib/tmdb-image";
import { Content } from "@/types";

interface SimilarContentCardProps {
  content: Content;
}

export default function SimilarContentCard({ content }: SimilarContentCardProps) {
  return (
    <Link
      href={`/watch/${content.id}`}
      className="group overflow-hidden rounded-lg bg-[#2f2f2f] shadow-lg"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <div className="relative w-full">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="aspect-video w-full"
          src={getBackdropUrl(content.backDropImage, "w780")}
          alt="poster"
        />
        <div className="invisible absolute left-1/2 top-1/2 size-[3em] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white bg-[#1E1E14]/80 p-[0.5em] group-hover:visible">
          <Icon name="play" className="text-white" />
        </div>
      </div>
      <p className="mt-[1em] line-clamp-2 px-[1em] text-[16px] font-bold text-white">
        {content.title}
      </p>
      <div className="flex flex-row items-center justify-between px-[1em] text-[16px]">
        <div className="flex flex-row items-center gap-2 text-[16px] text-[#bcbcbc]">
          <p>{content.releaseYear}</p>
          <p>{Number(content.voteRating).toFixed(1)}</p>
          <span className="whitespace-nowrap rounded-[3px] border border-white/40 px-[0.5em] text-[0.7em] leading-[1.2] text-white/90">
            HD
          </span>
        </div>

        <MyListButton content={content} />
      </div>
      <p className="my-[1em] line-clamp-5 overflow-hidden px-[1em] text-[14px] leading-[20px] text-[#D2D2D2]">
        {content.overview}
      </p>
    </Link>
  );
}
