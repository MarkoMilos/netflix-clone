"use client";

import axios from "axios";
import { useCallback, useMemo } from "react";
import { AiOutlineCheck, AiOutlinePlus } from "react-icons/ai";

import useCurrentUser from "@/hooks/useCurrentUser";
import useFavourites from "@/hooks/useFavourites";
import { User } from "@/types";

interface FavouriteButtonProps {
  movieId: string;
}

export default function FavouriteButton({ movieId }: FavouriteButtonProps) {
  const { mutate: mutateFavourites } = useFavourites();
  const { data: currentUser, mutate } = useCurrentUser();

  const isFavourite = useMemo(() => {
    const list: string[] = currentUser?.favouriteIds || [];
    return list.includes(movieId);
  }, [currentUser, movieId]);

  const toggleFavourite = useCallback(async () => {
    let response;
    if (isFavourite) {
      response = axios.delete(`/api/favourite`, { data: { movieId } });
    } else {
      response = axios.post(`/api/favourite`, { movieId });
    }

    const updatedFavouriteIds: string[] = await response.then(res => res.data.favouriteIds);

    await mutate({
      ...currentUser,
      favouriteIds: updatedFavouriteIds,
    } as User);

    await mutateFavourites();
  }, [movieId, isFavourite, currentUser, mutate, mutateFavourites]);

  const Icon = isFavourite ? AiOutlineCheck : AiOutlinePlus;

  return (
    <button
      type="button"
      onClick={toggleFavourite}
      className="group-item flex size-6 cursor-pointer items-center justify-center rounded-full border-2 border-white transition hover:border-neutral-300 lg:size-10"
    >
      <Icon className="text-white" size={30} />
    </button>
  );
}
