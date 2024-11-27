"use client";

import {BsFillPlayFill} from "react-icons/bs";
import FavouriteButton from "@/components/FavouriteButton";
import {useRouter} from "next/navigation";
import useInfoModal from "@/hooks/useInfoModal";
import {BiChevronDown} from "react-icons/bi";
import {Movie} from "@/types";

interface ContentCardProps {
    movie: Movie
}

export default function ContentCard({movie}: ContentCardProps) {
    const router = useRouter();
    const {openModal} = useInfoModal();

    return (
        <div className="group bg-zinc-900 col-span-1 relative h-[12vw] rounded-md">

            <img
                className="
                    cursor-pointer
                    object-cover
                    transition
                    duration-150
                    shadow-xl
                    rounded-md
                    group-hover:opacity-90
                    sm:group-hover:opacity-0
                    delay-300
                    w-full
                    h-[12vw]
                "
                src={movie.thumbnailUrl}
                alt="thumbnail"
            />

            <div
                className="
                absolute
                top-0
                opacity-0
                transition
                duration-150
                z-10
                invisible
                sm:visible
                delay-300
                w-full
                scale-0
                group-hover:scale-110
                group-hover:-translate-y-[6vw]
                group-hover:opacity-100
            ">
                <img
                    className="
                        cursor-pointer
                        object-cover
                        transition
                        duration-150
                        shadow-xl
                        rounded-t-md
                        w-full
                        h-[12vw]
                    "
                    src={movie.thumbnailUrl}
                    alt="thumbnail"
                />

                <div
                    className="
                    z-10
                    bg-zinc-800
                    p-2
                    lg:p-4
                    absolute
                    w-full
                    transition
                    shadow-md
                    rounded-b-md
                ">
                    <div className="flex flex-row items-center gap-3">
                        <div
                            className="
                                cursor-pointer
                                w-6
                                h-6
                                lg:w-10
                                lg:h-10
                                bg-white
                                rounded-full
                                flex
                                justify-center
                                items-center
                                transition
                                hover:bg-neutral-300
                            "
                            onClick={() => router.push(`/watch/${movie.id}`)}
                        >
                            <BsFillPlayFill size={30}/>
                        </div>

                        <FavouriteButton movieId={movie.id}/>

                        <div
                            onClick={() => openModal(movie.id)}
                            className="
                                cursor-pointer
                                ml-auto
                                group/item
                                w-6 h-6 lg:h-10 lg:w-10
                                 border-white border-2
                                 rounded-full
                                 flex justify-center items-center
                                 transition
                                 hover:border-neutral-300
                            ">
                            <BiChevronDown size={30} className="text-white group-hover/item:text-neutral-300 w-4"/>
                        </div>

                    </div>

                    <p className="text-red-500 font-semibold mt-4">
                        New <span className="text-white">2024</span>
                    </p>

                    <div className="flex flex-row gap-2 items-center">
                        <p className="text-white text-[10px] lg:text-sm">{movie.duration}</p>
                    </div>

                    <div className="flex flex-row gap-2 items-center">
                        <p className="text-white text-[10px] lg:text-sm">{movie.genre}</p>
                    </div>

                </div>
            </div>

        </div>
    )
}
