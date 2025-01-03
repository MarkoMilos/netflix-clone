"use client";

import { useRouter } from "next/navigation";
import { BiChevronDown } from "react-icons/bi";
import { BsFillPlayFill } from "react-icons/bs";

import FavouriteButton from "@/components/FavouriteButton";
import useInfoModal from "@/hooks/useInfoModal";
import { Movie } from "@/types";

interface ContentCardProps {
  movie: Movie;
}

export default function ContentCard({ movie }: ContentCardProps) {
  const router = useRouter();
  const { openModal } = useInfoModal();

  return (
    <div className="group relative col-span-1 h-[12vw] rounded-md bg-zinc-900">
      <img
        className="h-[12vw] w-full cursor-pointer rounded-md object-cover shadow-xl transition delay-300 duration-150 group-hover:opacity-90 sm:group-hover:opacity-0"
        src={movie.thumbnailUrl}
        alt="thumbnail"
      />

      <div className="opacity/0 group-hover:opacity/100 invisible absolute top-0 z-10 w-full scale-0 transition delay-300 duration-150 group-hover:translate-y-[-6vw] group-hover:scale-110 sm:visible">
        <img
          className="h-[12vw] w-full cursor-pointer rounded-t-md object-cover shadow-xl transition duration-150"
          src={movie.thumbnailUrl}
          alt="thumbnail"
        />

        <div className="absolute z-10 w-full rounded-b-md bg-zinc-800 p-2 shadow-md transition lg:p-4">
          <div className="flex flex-row items-center gap-3">
            <button
              type="button"
              className="flex size-6 cursor-pointer items-center justify-center rounded-full bg-white transition hover:bg-neutral-300 lg:size-10"
              onClick={() => router.push(`/watch/${movie.id}`)}
            >
              <BsFillPlayFill size={30} />
            </button>

            <FavouriteButton movieId={movie.id} />

            <button
              type="button"
              onClick={() => openModal(movie.id)}
              className="group/item ml-auto flex size-6 cursor-pointer items-center justify-center rounded-full border-2 border-white transition hover:border-neutral-300 lg:size-10"
            >
              <BiChevronDown
                size={30}
                className="w-4 text-white group-hover/item:text-neutral-300"
              />
            </button>
          </div>

          <p className="mt-4 font-semibold text-red-500">
            New <span className="text-white">2024</span>
          </p>

          <div className="flex flex-row items-center gap-2">
            <p className="text-[10px] text-white lg:text-sm">{movie.duration}</p>
          </div>

          <div className="flex flex-row items-center gap-2">
            <p className="text-[10px] text-white lg:text-sm">{movie.genre}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
