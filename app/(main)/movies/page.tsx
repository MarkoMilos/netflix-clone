import React from "react";
import {movieRepository} from "@/repository/MovieRepository";
import MovieGrid from "@/components/MovieGrid/MovieGrid";
import {movieService} from "@/service/MovieService";
import Billboard from "@/components/Billboard";

export default async function MoviesPage() {
    const movies = await movieRepository.getAll() ?? [];
    const billboardMovie = await movieService.getRandomMovie();

    return (
        <>
            <div className="w-full pb-[40%] relative">
                <Billboard data={billboardMovie}/>
            </div>

            <div className="px-4 mt-4 pb-40">
                <MovieGrid movies={movies}/>
            </div>
        </>
    );
}