import React from 'react';
import Image from 'next/image';
import {Movie} from "@/types";
import styles from './MovieCard.module.css';

interface MovieCardProps {
    movie: Movie
}

export default function MovieCard({movie}: MovieCardProps) {
    return (
        <div className={`${styles.card} w-full aspect-[7/4] relative`}>
            <Image
                src={movie.thumbnailUrl}
                alt={movie.title}
                fill={true}
                style={{
                    objectFit: 'cover',
                }}
            />
            <div className={styles.overlay}/>
        </div>
    )
}
