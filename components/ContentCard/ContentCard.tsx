"use client";

import styles from "./ContentCard.module.css";
import ContentDialog from "@/components/ContentDialog/ContentDialog";
import { ContentItem } from "@/types";

export type DialogPosition = "align-left" | "align-center" | "align-right";

interface ContentCardProps {
  item: ContentItem;
  dialogPosition?: DialogPosition;
}

export default function ContentCard({ item, dialogPosition = "align-center" }: ContentCardProps) {
  // Determine dialog CSS classes based on position
  const dialogClasses = `${styles.dialogWrapper} ${styles[`dialogWrapper-${dialogPosition}`]}`;

  return (
    <div className={styles.container}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className={styles.poster} src={item.backDropImage} alt="poster" />
      <div className={styles.title}>{item.title}</div>

      <div className={dialogClasses}>
        <ContentDialog item={item} />
      </div>
    </div>
  );
}
