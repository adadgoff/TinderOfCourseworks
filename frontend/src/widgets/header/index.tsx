import styles from "./styles.module.scss";
import { Logo, ThemeToggle } from "./ui";

export function Header() {
  return (
    <header className={styles.header}>
      <Logo href="/" />
      <div className={styles.right}>
        <ThemeToggle />
      </div>
    </header>
  );
}
