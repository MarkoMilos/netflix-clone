"use client";

import Link from "next/link";

import styles from "./ContentDialog.module.css";
import Icon from "@/components/Icons";
import LikeButton from "@/components/LikeButton";
import MyListButton from "@/components/MyListButton";
import useInfoModal from "@/hooks/useInfoModal";
import { getBackdropUrl } from "@/lib/tmdb-image";
import { Content } from "@/types";

interface ContentDialogProps {
  content: Content;
}

export default function ContentDialog({ content }: ContentDialogProps) {
  const { openModal } = useInfoModal();

  return (
    <div className={styles.dialog}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className={styles.poster} src={getBackdropUrl(content.backDropImage)} alt="poster" />

      <div className={styles.contentContainer}>
        <div className={styles.title}>{content.title}</div>

        <div className={styles.actionsContainer}>
          {/* Play button */}
          <Link href={`/watch/${content.id}`}>
            <div className={styles.playButton}>
              <Icon name="play" className={styles.playIcon} />
            </div>
          </Link>
          {/* MyList button */}
          <MyListButton content={content} className={styles.myListButton} />
          {/* Like button */}Í
          <LikeButton />
          {/* More button */}
          <button type="button" className={styles.moreButton} onClick={() => openModal(content.id)}>
            <Icon name="more" className={styles.moreIcon} />
          </button>
        </div>

        <div className={styles.labels}>
          <span className={styles.labelYear}>{content.releaseYear}</span>
          <span className={styles.labelRating}>Rating: {content.voteRating}</span>
          <Icon className={styles.spatialIcon} name="spatial" />
        </div>

        <div className={styles.genresContainer}>
          {content.genres?.map((genre, index) => [
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
