"use client";

import { useCallback, useMemo } from "react";

import styles from "./MyListButton.module.css";
import Icon from "@/components/Icons";
import useMyList from "@/hooks/useMyList";
import { Content } from "@/types/Content";

interface MyListButtonProps {
  content: Content;
  className?: string;
}

export default function MyListButton({ content, className = "" }: MyListButtonProps) {
  const { data, isLoading, addToMyList, removeFromMyList } = useMyList();

  const isInFavourites = useMemo(() => data?.some(item => item.id === content.id), [data, content]);

  const toggleMyList = useCallback(async () => {
    if (isLoading) return;

    try {
      if (isInFavourites) {
        await removeFromMyList(content.id);
      } else {
        await addToMyList(content);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Failed to toggle my-list status:", error);
    }
  }, [content, isLoading, isInFavourites, removeFromMyList, addToMyList]);

  return (
    <button
      type="button"
      onClick={toggleMyList}
      disabled={isLoading}
      className={`${styles.button} ${className || ""}`}
      aria-label={isInFavourites ? "Remove from My List" : "Add to My List"}
    >
      <Icon name={isInFavourites ? "check" : "plus"} className={styles.icon} />
    </button>
  );
}
