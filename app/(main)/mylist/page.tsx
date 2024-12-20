import React from "react";
import MovieGrid from "@/components/MovieGrid/MovieGrid";
import {movieRepository} from "@/repository/MovieRepository";

export default async function MyListPage() {
    const movies = await movieRepository.getAll() ?? [];

    return (
        <div className="w-full pt-[120px] px-4">

            <p className="text-lg text-white font-bold mb-4">My List</p>

            <MovieGrid movies={movies}/>
        </div>
    );
}