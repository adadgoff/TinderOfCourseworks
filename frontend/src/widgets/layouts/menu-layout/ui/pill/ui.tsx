import styles from "./styles.module.scss";
import { UserRole } from "@/entities/user/types";
import { capitalize } from "@/shared/lib/string";
import { GreyIcon } from "@/shared/ui/icon";

export function Pill({ role }: { role: UserRole }) {
  return (
    <div className={styles.pill}>
      {capitalize(role)}
      <GreyIcon name="menu/pill" />
    </div>
  );
}
