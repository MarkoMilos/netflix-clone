"use client";

import styles from "./ContentCard.module.css";
import { ContentItem } from "@/types";

interface ContentCardProps {
  item: ContentItem;
}

export default function ContentCard({ item }: ContentCardProps) {
  return (
    <div className={styles.container}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className={styles.poster} src={item.backDropImage} alt="poster" />
      <div className={styles.title}>{item.title}</div>
    </div>
  );
}
