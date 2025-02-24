"use client";

import ContentCarousel from "@/components/ContentCarousel";
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
  return <ContentCarousel movies={data} title={title} />;
}
