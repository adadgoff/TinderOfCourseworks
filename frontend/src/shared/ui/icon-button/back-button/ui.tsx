import styles from "./styles.module.scss";
import { Button } from "../../button";
import { GreyIcon } from "../../icon/icons";

export function BackButton() {
  return (
    <Button className={styles.backButton} decor="grey">
      <GreyIcon name="courseworks/back" isStroke={true} size="s" />
    </Button>
  );
}
