import styles from "./styles.module.scss";
import { Icon } from "@/shared/ui/icon";
import { Button } from "@/shared/ui/button";
import Link from "next/link";
import { UserRole } from "@/entities/user/types";
import { capitalize } from "@/shared/lib/string";
import { IconName } from "@/shared/ui/icon/types";

export function AuthCard({
  role,
  iconName,
  listItems,
}: {
  role: UserRole;
  iconName: IconName;
  listItems: [string, ...[string]];
}) {
  return (
    <article className={styles.authCard}>
      <span className={styles.title}>{capitalize(role)}</span>
      <Icon name={iconName} size="xl" />
      <span className={styles.capabilities}>Capabilities</span>
      <ol>
        {listItems.map((listItem, index) => (
          <li key={index}>{listItem}</li>
        ))}
      </ol>
      <div className={styles.cards}>
        <Link href={{ pathname: "/login", query: { from: role } }}>
          <Button decor="accent">login</Button>
        </Link>
        <Link href={{ pathname: "/register", query: { from: role } }}>
          <Button decor="accent">create account</Button>
        </Link>
      </div>
    </article>
  );
}
