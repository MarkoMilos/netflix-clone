"use client";

import styles from "./ContentRankCard.module.css";
import Number1Svg from "@/assets/icons/number-1.svg";
import Number10Svg from "@/assets/icons/number-10.svg";
import Number2Svg from "@/assets/icons/number-2.svg";
import Number3Svg from "@/assets/icons/number-3.svg";
import Number4Svg from "@/assets/icons/number-4.svg";
import Number5Svg from "@/assets/icons/number-5.svg";
import Number6Svg from "@/assets/icons/number-6.svg";
import Number7Svg from "@/assets/icons/number-7.svg";
import Number8Svg from "@/assets/icons/number-8.svg";
import Number9Svg from "@/assets/icons/number-9.svg";
import { Content } from "@/types";

type ContentRankCardProps = {
  content: Content;
  rank: number;
};

export default function ContentRankCard({ content, rank }: ContentRankCardProps) {
  return (
    <div className={styles.container}>
      {rank === 1 && <Number1Svg className={styles.rank} />}
      {rank === 2 && <Number2Svg className={styles.rank} />}
      {rank === 3 && <Number3Svg className={styles.rank} />}
      {rank === 4 && <Number4Svg className={styles.rank} />}
      {rank === 5 && <Number5Svg className={styles.rank} />}
      {rank === 6 && <Number6Svg className={styles.rank} />}
      {rank === 7 && <Number7Svg className={styles.rank} />}
      {rank === 8 && <Number8Svg className={styles.rank} />}
      {rank === 9 && <Number9Svg className={styles.rank} />}
      {rank === 10 && <Number10Svg className={styles.rank} />}

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className={styles.poster} src={content.posterImage} alt="poster" />
    </div>
  );
}
