"use client"

import {Movie} from "@/types";
import useFavourites from "@/hooks/useFavourites";
import MovieList from "@/components/MovieList";

interface FavouriteListProps {
    movies: Movie[],
    title: string
}

export default function FavouriteList({movies, title}: FavouriteListProps) {
    const {data} = useFavourites(movies);
    if (!data) {
        return null;
    }
    return (
        <MovieList movies={data} title={title}/>
    );
}
