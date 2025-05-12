import { User } from "@/entities/user/types";
import styles from "./styles.module.scss";
import { Img } from "@/shared/ui/image";
import { formatDateByLocale } from "@/shared/lib/date";

interface ProfileBaseProps
  extends Omit<
    User,
    "birthDay" | "city" | "contact" | "email" | "id" | "password" | "skills"
  > {}

export function ProfileBase({
  surname,
  name,
  patronymic,
  description,
  iconUrl,
  lastOnline,
}: ProfileBaseProps) {
  const fullName: string = [surname, name, patronymic].join(" ");

  return (
    <article className={styles.profileBase}>
      <Img size="l" src={iconUrl} />

      <div className={styles.content}>
        <header className={styles.header}>
          <span className={styles.fullName}>
            <b>{fullName}</b>
          </span>
          <span className={styles.lastOnline}>
            {formatDateByLocale(lastOnline)}
          </span>
        </header>

        <p className={styles.description}>{description}</p>
      </div>
    </article>
  );
}
