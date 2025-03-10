import ContentDialog from "./ContentDialog";
import styles from "./ContentDialogWrapper.module.css";
import { Content } from "@/types";

export type DialogPosition = "align-left" | "align-center" | "align-right";

export function ContentDialogWrapper({
  children,
  item,
  position,
}: {
  children: React.ReactNode;
  item: Content;
  position: DialogPosition;
}) {
  const dialogContainerClasses = `${styles.dialogContainer} ${styles[`dialogContainer-${position}`]}`;

  return (
    <div className={styles.dialogWrapper}>
      {children}
      <div className={dialogContainerClasses}>
        <ContentDialog content={item} />
      </div>
    </div>
  );
}
