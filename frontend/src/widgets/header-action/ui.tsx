import { Button } from "@/shared/ui/button";
import styles from "./styles.module.scss";
import { BackButton } from "@/shared/ui/icon-button/back-button";
import Link from "next/link";
import { ActionHeaderException } from "./errors";

interface ActionHeaderProps {
  backUrl: string;
  isDisabled?: boolean;
  onCancelChangesClick?: () => void;
  onCreateCourseworkClick?: () => void;
  onSaveChangesClick?: () => void;
  type?: "create" | "edit" | "view";
}

export function ActionHeader({
  backUrl,
  isDisabled,
  onCancelChangesClick,
  onCreateCourseworkClick,
  onSaveChangesClick,
  type = "view",
}: ActionHeaderProps) {
  const isCreateType = type === "create";
  const isEditType = type === "edit";
  const isViewType = type === "view";

  if (!isViewType && isDisabled === undefined) {
    throw new ActionHeaderException(
      "SubHeaderMenu with `create` or `edit` type must have defined `isDisabled`.",
    );
  }
  if (isCreateType && onCreateCourseworkClick === undefined) {
    throw new ActionHeaderException(
      "SubHeaderMenu with `create` type must have defined `onCreateCourseworkClick`.",
    );
  }
  if (
    isEditType &&
    (onCancelChangesClick === undefined || onSaveChangesClick === undefined)
  ) {
    throw new ActionHeaderException(
      "SubHeaderMenu with `edit` type must have defined `onCancelChangesClick` and `onSaveChangesClick`.",
    );
  }

  return (
    <header className={styles.header}>
      <Link href={backUrl}>
        <BackButton />
      </Link>

      {!isViewType && (
        <div className={styles.right}>
          {isCreateType && (
            <Button
              decor="accent"
              disabled={isDisabled}
              onClick={onCreateCourseworkClick}
              type="submit"
            >
              create coursework
            </Button>
          )}

          {isEditType && (
            <>
              <Button
                decor="grey"
                disabled={isDisabled}
                onClick={onCancelChangesClick}
                type="reset"
              >
                cancel changes
              </Button>
              <Button
                decor="accent"
                disabled={isDisabled}
                onClick={onSaveChangesClick}
                type="submit"
              >
                save changes
              </Button>
            </>
          )}
        </div>
      )}
    </header>
  );
}
