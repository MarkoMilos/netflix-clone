"use client";

import styles from "./MyList.module.css";
import ContentCard from "@/components/ContentCard/ContentCard";
import { ContentDialogWrapper, DialogPosition } from "@/components/ContentDialog";
import useMyList from "@/hooks/useMyList";
import { ResponsiveValue, useResponsiveValue } from "@/hooks/useResponsiveValue";
import { Content } from "@/types";

// Defines the number of items to show in a row based on the screen size
const RESPONSIVE_CONFIG: ResponsiveValue<number> = {
  base: 3, // < 800px: 3 items
  sm: 3, // >= 500px: 3 items (same as base)
  md: 4, // >= 800px: 4 items
  lg: 5, // >= 1100px: 5 items
  xl: 6, // >= 1400px: 6 items
};

interface MyListProps {
  initialData: Content[];
}

export default function MyList({ initialData }: MyListProps) {
  const { data } = useMyList(initialData);

  const itemsPerRow = useResponsiveValue(RESPONSIVE_CONFIG);

  const getDialogPosition = (index: number): DialogPosition => {
    const positionInRow = (index % itemsPerRow) + 1;
    if (positionInRow === 1) return "align-left";
    if (positionInRow === itemsPerRow) return "align-right";
    return "align-center";
  };

  if (!data || data.length === 0) {
    return (
      <div className={styles.container}>
        <p className="mt-[100px]">
          Your list is empty. Add some movies or TV shows to get started!
        </p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>My List</h1>
      <div className={styles.gridContainer}>
        {data.map((content, index) => (
          <div key={content.id}>
            <ContentDialogWrapper content={content} position={getDialogPosition(index)}>
              <ContentCard content={content} />
            </ContentDialogWrapper>
          </div>
        ))}
      </div>
    </div>
  );
}
