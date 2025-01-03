import React from "react";

import Billboard from "@/components/Billboard";
import MovieGrid from "@/components/MovieGrid/MovieGrid";
import movieRepository from "@/repository/MovieRepository";
import movieService from "@/service/MovieService";

export default async function MoviesPage() {
  const movies = (await movieRepository.getAll()) ?? [];
  const billboardMovie = await movieService.getRandomMovie();

  return (
    <>
      <div className="relative w-full pb-[40%]">
        <Billboard data={billboardMovie} />
      </div>

      <div className="mt-4 px-4 pb-40">
        <MovieGrid movies={movies} />
      </div>
    </>
  );
}
