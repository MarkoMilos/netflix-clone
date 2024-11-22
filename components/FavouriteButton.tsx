"use client";

import {AiOutlineCheck, AiOutlinePlus} from "react-icons/ai";
import useFavourites from "@/hooks/useFavourites";
import useCurrentUser from "@/hooks/useCurrentUser";
import {useCallback, useMemo} from "react";
import axios from "axios";

interface FavouriteButtonProps {
    movieId: string;
}

export default function FavouriteButton({movieId}: FavouriteButtonProps) {
    const {mutate: mutateFavourites} = useFavourites();
    const {data: currentUser, mutate} = useCurrentUser();

    const isFavourite = useMemo(() => {
        const list: [string] = currentUser?.favouriteIds || [];
        return list.includes(movieId);
    }, [currentUser, movieId]);

    const toggleFavourite = useCallback(async () => {
        let response;
        if (isFavourite) {
            response = axios.delete(`/api/favourite`, {data: {movieId}});
        } else {
            response = axios.post(`/api/favourite`, {movieId});
        }

        const updatedFavouriteIds = await response.then(res => res.data.favouriteIds);

        await mutate({
            ...currentUser,
            favouriteIds: updatedFavouriteIds
        });

        await mutateFavourites()
    }, [movieId, isFavourite, currentUser, mutate, mutateFavourites]);

    const Icon = isFavourite ? AiOutlineCheck : AiOutlinePlus;

    return (
        <div
            onClick={toggleFavourite}
            className="
                cursor-pointer
                group-item
                w-6 h-6
                lg:w-10 lg:h-10
                border-2 border-white rounded-full
                flex justify-center items-center
                transition hover:border-neutral-300"
        >
            <Icon className="text-white" size={30}/>
        </div>
    )
}
