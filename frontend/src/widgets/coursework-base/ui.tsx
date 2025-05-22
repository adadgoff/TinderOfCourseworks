import styles from "./styles.module.scss";
import { formatDateByLocale } from "@/shared/lib/date";
import { Img } from "@/shared/ui/image";
import { Icon } from "@/shared/ui/icon";
import { Coursework } from "@/entities/types/coursework";

export function CourseworkBase({
  description,
  iconUrl,
  lastChange,
  status,
  title,
}: Coursework) {
  return (
    <article className={styles.courseworkBase}>
      <Img size="l" src={iconUrl} />

      <div className={styles.content}>
        <header className={styles.header}>
          <span className={styles.title}>
            <b>{title}</b>
          </span>
          <div className={styles.right}>
            <span className={styles.lastChange}>
              {/* {formatDateByLocale(lastChange)} */}
              {lastChange}
            </span>
            <Icon name={`courseworks/${status}`} size="s" />
          </div>
        </header>

        <p className={styles.description}>{description}</p>
      </div>
    </article>
  );
}
