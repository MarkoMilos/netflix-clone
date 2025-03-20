import { useMemo } from "react";

import ContentDialog from "./ContentDialog";
import styles from "./ContentDialogWrapper.module.css";
import { Content } from "@/types";

export type DialogPosition = "align-left" | "align-center" | "align-right";

export function ContentDialogWrapper({
  children,
  content,
  position,
}: {
  children: React.ReactNode;
  content: Content;
  position: DialogPosition;
}) {
  const dialogContainerClasses = useMemo(
    () => `${styles.dialogContainer} ${styles[`dialogContainer-${position}`]}`,
    [position],
  );

  return (
    <div className={styles.dialogWrapper}>
      {children}
      <div className={dialogContainerClasses}>
        <ContentDialog content={content} />
      </div>
    </div>
  );
}
