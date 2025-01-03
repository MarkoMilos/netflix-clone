import React from "react";

import MovieGrid from "@/components/MovieGrid/MovieGrid";
import movieRepository from "@/repository/MovieRepository";

export default async function MyListPage() {
  const movies = (await movieRepository.getAll()) ?? [];

  return (
    <div className="w-full px-4 pt-[120px]">
      <p className="mb-4 text-lg font-bold text-white">My List</p>

      <MovieGrid movies={movies} />
    </div>
  );
}
