import { GreyP } from "@/shared/ui/p";
import styles from "./styles.module.scss";
import { formatDateTimeByLocale } from "@/shared/lib/date";

export function DateTime({ dateTime }: { dateTime: Date }) {
  return (
    <GreyP className={styles.dateTime}>
      {formatDateTimeByLocale(dateTime)}
    </GreyP>
  );
}
