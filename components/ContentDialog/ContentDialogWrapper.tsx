import { ContentDialog } from ".";
import styles from "./ContentDialogWrapper.module.css";
import { ContentItem } from "@/types";

export type DialogPosition = "align-left" | "align-center" | "align-right";

export function ContentDialogWrapper({
  children,
  item,
  position,
}: {
  children: React.ReactNode;
  item: ContentItem;
  position: DialogPosition;
}) {
  const dialogContainerClasses = `${styles.dialogContainer} ${styles[`dialogContainer-${position}`]}`;

  return (
    <div className={styles.dialogWrapper}>
      {children}
      <div className={dialogContainerClasses}>
        <ContentDialog item={item} />
      </div>
    </div>
  );
}
