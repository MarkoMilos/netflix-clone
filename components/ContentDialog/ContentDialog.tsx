"use client";

import Link from "next/link";

import styles from "./ContentDialog.module.css";
import Icon from "@/components/Icons";
import { ContentItem } from "@/types";

interface ContentDialogProps {
  item: ContentItem;
}

export default function ContentDialog({ item }: ContentDialogProps) {
  return (
    <div className={styles.dialog}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className={styles.poster} src={item.backDropImage} alt="poster" />

      <div className={styles.contentContainer}>
        <div className={styles.title}>{item.title}</div>

        <div className={styles.actionsContainer}>
          {/* Play button */}
          <Link href={`/watch/${item.id}`}>
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

        <div className={styles.labels}>
          <span className={styles.labelYear}>{item.releaseYear}</span>
          <span className={styles.labelRating}>Rating: {item.voteRating}</span>
          <Icon className={styles.spatialIcon} name="spatial" />
        </div>

        <div className={styles.genresContainer}>
          {item.genres?.map((genre, index) => [
            index > 0 && (
              <span key={`separator-${genre.id}`} className={styles.genresSeparator}>
                &middot;
              </span>
            ),
            <span key={genre.id}>{genre.name}</span>,
          ])}
        </div>
      </div>
    </div>
  );
}
