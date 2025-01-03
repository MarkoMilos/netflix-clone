"use client";

import MovieList from "@/components/MovieList";
import useFavourites from "@/hooks/useFavourites";
import { Movie } from "@/types";

interface FavouriteListProps {
  movies: Movie[];
  title: string;
}

export default function FavouriteList({ movies, title }: FavouriteListProps) {
  const { data } = useFavourites(movies);
  if (!data) {
    return null;
  }
  return <MovieList movies={data} title={title} />;
}
