import React from 'react';
import {Movie} from "@/types";
import styles from './MovieGrid.module.css';
import Link from "next/link";
import MovieCard from "@/components/MovieCard/MovieCard";

interface MovieGridProps {
    movies: Movie[];
}

export default function MovieGrid({movies}: MovieGridProps) {
    return (
        <div className={styles.grid}>
            {movies.map(movie => (
                <Link href={`/watch/${movie.id}`} key={movie.id}>
                    <MovieCard movie={movie}/>
                </Link>
            ))}
        </div>
    )
}
