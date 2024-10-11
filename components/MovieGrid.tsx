import React from 'react';
import MovieCard from "@/components/MovieCard";
import {Movie} from "@/models/movie";
import Link from "next/link";

interface MovieGridProps {
    movies: Movie[];
}

export default function MovieGrid({movies}: MovieGridProps) {
    return (
        <div className="movie-grid">
            {movies.map(movie => (
                <Link href={`/title/${movie.id}`} key={movie.id}>
                    <MovieCard
                        movie={movie}
                    />
                </Link>
            ))}
        </div>
    )
}
