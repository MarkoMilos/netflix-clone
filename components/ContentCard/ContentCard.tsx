"use client";

import Link from "next/link";

import styles from "./ContentCard.module.css";
import Icon from "@/components/Icons";
import { ContentItem } from "@/types";

export type DialogPosition = "align-left" | "align-center" | "align-right";

interface ContentCardProps {
  item: ContentItem;
  dialogPosition?: DialogPosition;
}

export default function ContentCard({ item, dialogPosition = "align-center" }: ContentCardProps) {
  // Determine dialog CSS classes based on position
  const dialogClasses = `${styles.dialog} ${styles[`dialog-${dialogPosition}`]}`;

  return (
    <div className={styles.container}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className={styles.poster} src={item.contentPosterImage} alt="poster" />
      <div className={styles.title}>{item.contentTitle}</div>

      <div className={dialogClasses}>
        <div className={styles.dialogInner}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className={styles.dialogPoster} src={item.contentPosterImage} alt="poster" />

          <div className={styles.dialogContent}>
            <div className={styles.dialogTitle}>{item.contentTitle}</div>

            <div className={styles.dialogActions}>
              {/* Play button */}
              <Link href={`/watch/${item.contentId}`}>
                <div className={styles.playButton}>
                  <Icon name="play" className={styles.playIcon} />
                </div>
              </Link>

              {/* Add to watchlist button */}
              <button type="button" className={styles.watchlistButton}>
                <Icon name="plus" className={styles.watchlistIcon} />
              </button>

              {/* Like button */}
              <button type="button" className={styles.likeButton}>
                <Icon name="like" className={styles.likeIcon} />
              </button>

              {/* More button */}
              <button type="button" className={styles.moreButton}>
                <Icon name="more" className={styles.moreIcon} />
              </button>
            </div>

            <div className={styles.dialogLabels}>
              <span className={styles.dialogYear}>{item.contentYear}</span>
              <span className={styles.dialogRating}>Rating: {item.contentRating}</span>
              <Icon className={styles.spatialIcon} name="spatial" />
            </div>

            <div className={styles.dialogGenres}>
              {["Action", "Adventure", "Suspense"].map((genre, index) => (
                <span className={styles.genreLabel} key={genre}>
                  {index > 0 && <span className={styles.genreSeparator}>&middot;</span>}
                  {genre}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
