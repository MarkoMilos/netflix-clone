"use client";

import styles from "./ContentCard.module.css";
import { getBackdropUrl } from "@/lib/tmdb-image";
import { Content } from "@/types";

interface ContentCardProps {
  content: Content;
}

export default function ContentCard({ content }: ContentCardProps) {
  return (
    <div className={styles.container}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className={styles.poster} src={getBackdropUrl(content.backDropImage)} alt="poster" />
      <div className={styles.title}>{content.title}</div>
    </div>
  );
}
