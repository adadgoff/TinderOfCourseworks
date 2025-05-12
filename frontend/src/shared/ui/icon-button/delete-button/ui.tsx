import styles from "./styles.module.scss";
import { GreyIcon } from "../../icon";
import { Button } from "../../button";
import { ButtonProps } from "../../button/types";

interface DeleteButtonProps extends ButtonProps {
  onDelete: () => void;
}

export function DeleteButton({ onDelete }: DeleteButtonProps) {
  return (
    <Button className={styles.deleteButton} onClick={onDelete}>
      <GreyIcon isStroke={true} name="common/cross" size="xs" />
    </Button>
  );
}
