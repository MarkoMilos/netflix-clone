"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import styles from "./NetflixCarousel.module.css";
import Icon from "@/components/Icons";
import { ResponsiveValue, useResponsiveValue } from "@/hooks/useResponsiveValue";

const data = [
  "https://placehold.co/350x200?text=1",
  "https://placehold.co/350x200?text=2",
  "https://placehold.co/350x200?text=3",
  "https://placehold.co/350x200?text=4",
  "https://placehold.co/350x200?text=5",
  "https://placehold.co/350x200?text=6",
  "https://placehold.co/350x200?text=7",
  "https://placehold.co/350x200?text=8",
  "https://placehold.co/350x200?text=9",
  "https://placehold.co/350x200?text=10",
  "https://placehold.co/350x200?text=11",
  "https://placehold.co/350x200?text=12",
  "https://placehold.co/350x200?text=13",
  "https://placehold.co/350x200?text=14",
  "https://placehold.co/350x200?text=15",
];

type SlideDirection = "next" | "previous";

type AnimationState = {
  isSliding: boolean;
  direction: SlideDirection | null;
};

// Defines the animation duration for the carousel
const ANIMATION_DURATION = 1000;

// Defines the number of items to show based on the screen size
const CAROUSEL_RESPONSIVE_CONFIG: ResponsiveValue<number> = {
  base: 3, // < 800px: 3 items
  sm: 3, // >= 500px: 3 items (same as base)
  md: 4, // >= 800px: 4 items
  lg: 5, // >= 1100px: 5 items
  xl: 6, // >= 1400px: 6 items
};

export default function NetflixCarousel() {
  const [firstVisibleItemIndex, setFirstVisibleItemIndex] = useState(0); // Index of the first fully visible item
  const [isCircular, setIsCircular] = useState(false); // Tracks if the carousel is in circular mode
  const [animationState, setAnimationState] = useState<AnimationState>({
    isSliding: false,
    direction: null,
  });
  const [isMounted, setIsMounted] = useState(false); // Tracks if the component is mounted

  // Calculate the number of items to show based on the current screen size
  const visibleItems = useResponsiveValue(CAROUSEL_RESPONSIVE_CONFIG);

  // Calculate width of a single item based on the number of visible items on screen
  const itemWidth = useMemo(() => 100 / visibleItems, [visibleItems]);

  // Calculate translation based on the current state (circular/non-circular) and animation state
  const translation = useMemo(() => {
    // After the first slide interaction the caraousel will become circular meaning that it will show the set of
    // items (visibleItems) in the middle of the slider, with partially visible items on both sides and non visible
    // items on the far left and right required for the wraparound effect (next/previous animation).
    // The slider holds the following items:
    // [[hidden items] [partially visible item] [visible items] [partially visible item] [hidden items]]
    // Base translation is translation required to show the first item in the visible items set.
    // Given that we always have partially visible item the translation needs to account for a single item width.
    const baseTranslation = -100 - itemWidth;

    // In the initial state non-circular (before any interaction), there is no translation
    if (!isCircular && !animationState.isSliding) {
      return 0;
    }

    // If the carousel is animating, calculate the translation based on the direction
    if (animationState.isSliding) {
      const directionFactor = animationState.direction === "next" ? 1 : -1;

      // In the initial non-circular state (before interaction), the slider will translate from 0% to -100% (left)
      if (!isCircular) {
        return -100 * directionFactor;
      }

      // After the first interaction, the slider translation is set to the base translation
      // The animation will move the slider by 100% in the direction of the animation from the base translation
      return baseTranslation - 100 * directionFactor;
    }

    return baseTranslation;
  }, [itemWidth, isCircular, animationState]);

  const contentItems = useMemo(() => {
    // Calculate the number of items to display based on user slider state (circular/non-circular)
    // - Non-ciruclar (initial state): visibleItems * 2 + 1 (initial items + 1 partial + items after next animation)
    // - Circular (after interaction): visibleItems * 3 + 2 (visible items + left/right items + 2 partial)
    const numberOfItems = isCircular ? visibleItems * 3 + 2 : visibleItems * 2 + 1;
    // Calculate start index for slider content:
    // - Non-ciruclar (initial state): start from 0
    // - Circular (after interaction): shift back by (visibleItems + 1) positions to include hidden left items,
    //   add array length and use modulo to handle wraparound
    const startIndex = isCircular
      ? (firstVisibleItemIndex - visibleItems - 1 + data.length) % data.length
      : 0;
    // Generate the content items to display
    const items = [];
    for (let i = 0; i < numberOfItems; i += 1) {
      items.push(data[(startIndex + i) % data.length]);
    }
    return items;
  }, [isCircular, firstVisibleItemIndex, visibleItems]);

  const slide = useCallback(
    (direction: SlideDirection) => {
      if (animationState.isSliding) return;

      setAnimationState({ isSliding: true, direction });

      const directionFactor = direction === "next" ? 1 : -1;

      setTimeout(() => {
        setAnimationState({ isSliding: false, direction: null });
        setFirstVisibleItemIndex(
          prevIndex => (prevIndex + directionFactor * visibleItems + data.length) % data.length,
        );
        if (!isCircular) setIsCircular(true);
      }, ANIMATION_DURATION);
    },
    [animationState, isCircular, visibleItems],
  );

  const handlePrevious = useCallback((): void => slide("previous"), [slide]);
  const handleNext = useCallback((): void => slide("next"), [slide]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Prevent rendering the carousel before the component is mounted
  if (!isMounted) return null;

  return (
    <div className={styles.container}>
      <button
        className={`${styles.handleLeft} ${!isCircular ? styles.hidden : ""}`}
        onClick={handlePrevious}
        type="button"
        aria-label="See previous titles"
      >
        <Icon name="chevron" className={styles.handleIcon} />
      </button>

      <button
        className={styles.handleRight}
        onClick={handleNext}
        type="button"
        aria-label="See more titles"
      >
        <Icon name="chevron" className={styles.handleIcon} />
      </button>

      <div className={styles.slider}>
        <div
          className={styles.sliderContent}
          style={{
            transform: `translateX(${translation}%)`,
            transition: animationState.isSliding
              ? `transform ${ANIMATION_DURATION}ms ease-in-out`
              : "none",
          }}
        >
          {contentItems.map((item, index) => (
            <div
              // eslint-disable-next-line react/no-array-index-key
              key={`${item}-${index}-${firstVisibleItemIndex}`}
              className={styles.item}
              style={{ width: `${itemWidth}%` }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item} alt={`Item ${index}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
