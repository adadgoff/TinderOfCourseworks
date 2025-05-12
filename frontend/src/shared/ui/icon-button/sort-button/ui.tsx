import styles from "./styles.module.scss";
import { Button } from "../../button";
import { GreyIcon } from "../../icon";

export function SortButton() {
  return (
    <Button className={styles.sortButton} decor="grey">
      <GreyIcon isStroke={true} name="common/sort" size="s" />
    </Button>
  );
}
