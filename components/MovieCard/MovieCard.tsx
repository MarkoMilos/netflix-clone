import Image from "next/image";
import React from "react";

import styles from "./MovieCard.module.css";
import { Movie } from "@/types";

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <div className={`${styles.card} relative aspect-[7/4] w-full`}>
      <Image
        src={movie.thumbnailUrl}
        alt={movie.title}
        fill
        style={{
          objectFit: "cover",
        }}
      />
      <div className={styles.overlay} />
    </div>
  );
}
