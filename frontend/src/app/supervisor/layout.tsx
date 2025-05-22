import { UserRole } from "@/entities/user/types";
import styles from "./styles.module.scss";
import { MenuLayout } from "@/widgets/layouts";

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MenuLayout role={UserRole.Supervisor}>
      <main className={styles.main}>{children}</main>
    </MenuLayout>
  );
}
