import { IconName } from "@/shared/ui/icon/types";
import styles from "./styles.module.scss";
import { Icon } from "@/shared/ui/icon";

export function Step({
  stepNumber,
  iconName,
  text,
}: {
  stepNumber: number;
  iconName: IconName;
  text: string;
}) {
  return (
    <div className={styles.step}>
      <span>
        <b>{stepNumber}</b>
      </span>

      <div className={styles.stepDescription}>
        <Icon name={iconName} size="l" />
        <p>{text}</p>
      </div>
    </div>
  );
}
