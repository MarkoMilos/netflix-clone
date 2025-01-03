import Link from "next/link";
import React from "react";

import styles from "./MovieGrid.module.css";
import MovieCard from "@/components/MovieCard/MovieCard";
import { Movie } from "@/types";

interface MovieGridProps {
  movies: Movie[];
}

export default function MovieGrid({ movies }: MovieGridProps) {
  return (
    <div className={styles.grid}>
      {movies.map(movie => (
        <Link href={`/watch/${movie.id}`} key={movie.id}>
          <MovieCard movie={movie} />
        </Link>
      ))}
    </div>
  );
}
