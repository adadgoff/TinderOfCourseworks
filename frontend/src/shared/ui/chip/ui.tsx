import { ComponentProps } from "react";
import { DeleteButton } from "../icon-button/delete-button";
import styles from "./styles.module.scss";

interface ChipProps extends ComponentProps<"div"> {
  isDeletable: boolean;
  onDelete: () => void;
  children: string;
}

export function Chip({
  isDeletable = false,
  onDelete,
  children,
  ...props
}: ChipProps) {
  return (
    <div className={styles.chip} {...props}>
      {children}
      {isDeletable && <DeleteButton onDelete={onDelete} />}
    </div>
  );
}
