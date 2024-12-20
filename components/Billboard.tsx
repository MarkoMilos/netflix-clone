"use client";

import {AiOutlineInfoCircle} from "react-icons/ai";
import PlayButton from "@/components/PlayButton";
import {useCallback} from "react";
import useInfoModal from "@/hooks/useInfoModal";
import {Movie} from "@/types";

interface BillboardProps {
    data: Movie | null
}

export default function Billboard({data}: BillboardProps) {
    const {openModal} = useInfoModal()

    const handleOpenModal = useCallback(() => {
        if (data) openModal(data?.id)
    }, [openModal, data]);

    if (!data) return null

    return (
        <div className="absolute w-full h-[56.25vw]">
            <video
                className="w-full h-[56.25vw] object-cover brightness-[60%]"
                src={data?.videoUrl}
                poster={data?.thumbnailUrl}
                autoPlay
                muted
                loop
            />

            {/* Gradient Overlay */}
            <div className="absolute bottom-0 left-0 w-full h-[20%] bg-gradient-to-t from-zinc-900 to-transparent"/>

            {/* Meta info */}
            <div className="absolute top-[30%] 2xl:top-[40%] ml-4 md:ml-16 w-full">
                <p className="text-white text-1xl md:text-3xl lg:text-5xl xl:text-6xl h-full w-[50%] font-bold drop-shadow-xl">
                    {data?.title}
                </p>

                <p className="text-white text-[8px] md:text-[10px] lg:text-[12px] xl:text-lg mt-3 md:mt-8 w-[90%] md:w-[80%] lg:w-[65%] xl:w-[50%] drop-shadow-xl">
                    {data?.description}
                </p>

                <div className="flex flex-row items-center mt-3 md:mt-4 gap-3">
                    <PlayButton movieId={data?.id}/>
                    <button
                        onClick={handleOpenModal}
                        className="bg-white text-white bg-opacity-30 rounded-md py-1 md:py-2 px-2 md:px-4 w-auto text-xs lg:text-lg font-bold flex flex-row items-center hover:bg-opacity-20 transition">
                        <AiOutlineInfoCircle className="mr-1"/>
                        More info
                    </button>
                </div>
            </div>

        </div>
    )
}
