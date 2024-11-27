import {useCallback, useEffect, useState} from "react";
import useInfoModal from "@/hooks/useInfoModal";
import useMovie from "@/hooks/useMovie";
import {AiOutlineClose} from "react-icons/ai";
import PlayButton from "@/components/PlayButton";
import FavouriteButton from "@/components/FavouriteButton";

interface InfoModalProps {
    visible?: boolean;
    onClose: () => void;
}

export default function InfoModal({visible, onClose}: InfoModalProps) {
    const [isVisible, setIsVisible] = useState(false);

    const {movieId} = useInfoModal();
    const {data} = useMovie(movieId as string);

    useEffect(() => {
        if (visible) {
            // Delay setting isVisible to true to trigger animation
            const timer = setTimeout(() => setIsVisible(true), 10);
            return () => clearTimeout(timer); // Cleanup timer on unmount
        } else {
            setIsVisible(false); // Trigger exit animation
        }
    }, [visible]);

    const handleClose = useCallback(() => {
        // Set visible to false to trigger the animation
        setIsVisible(false);
        // Call close that will set visible to false after 300ms to avoid early unmount
        setTimeout(() => {
            onClose();
        }, 300);
    }, [onClose]);

    if (!visible) return null;

    return (
        <div className="
            z-50
            transition
            duration-300
            bg-black
            bg-opacity-80
            flex
            justify-center
            items-center
            overflow-x-hidden
            overflow-y-auto
            fixed
            inset-0
        ">

            <div className="
                relative
                w-auto
                mx-auto
                max-w-3xl
                rounded-md
                overflow-hidden
            ">

                <div className={`
                   ${isVisible ? 'scale-100' : 'scale-0'}
                     transform
                     duration-300
                     relative
                     flex-auto
                     bg-zinc-900
                     drop-shadow-md
                `}>

                    <div className="relative h-96">
                        <video
                            className="
                                w-full
                                h-full
                                brightness-[60%]
                                object-cover
                             "
                            autoPlay
                            muted
                            loop
                            poster={data?.thumbnailUrl}
                            src={data?.videoUrl}
                        />

                        <div
                            onClick={handleClose}
                            className="
                                cursor-pointer
                                absolute
                                top-3 right-3
                                h-10 w-10
                                rounded-full
                                bg-black bg-opacity-70
                                flex items-center justify-center
                            ">
                            <AiOutlineClose size={20} className="text-white"/>
                        </div>

                        <div className="
                            absolute
                            bottom-[10%]
                            left-10
                        ">
                            <p className="text-white text-3xl md:text-4xl lg:text-5xl h-full font-bold mb-8">
                                {data?.title}
                            </p>
                            <div className="flex flex-row gap-4 items-center">
                                <PlayButton movieId={data?.id || ''}/>
                                <FavouriteButton movieId={data?.id || ''}/>
                            </div>
                        </div>

                    </div>

                    <div className="px-12 py-8">
                        <p className="text-green-400 font-semibold text-lg">
                            New
                        </p>
                        <p className="text-white text-lg">
                            {data?.duration}
                        </p>
                        <p className="text-white text-lg">
                            {data?.genre}
                        </p>
                        <p className="text-white text-lg">
                            {data?.description}
                        </p>
                    </div>

                </div>
            </div>
        </div>
    )
}
