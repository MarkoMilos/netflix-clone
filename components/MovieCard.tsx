import React from 'react';
import Image from 'next/image';
import {Movie} from "@/models/movie";

interface MovieCardProps {
    movie: Movie
}

export default function MovieCard({movie}: MovieCardProps) {
    return (
        <div className="movie-card w-full aspect-[7/4] relative">
            <Image
                src={movie.posterUrl}
                alt={movie.title}
                fill={true}
                style={{
                    objectFit: 'cover',
                }}
            />
            <div className="overlay"/>
        </div>
    )
}
