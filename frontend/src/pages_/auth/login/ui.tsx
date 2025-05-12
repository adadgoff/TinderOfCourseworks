import { InnerHeader } from "@/widgets/header-inner";
import styles from "./styles.module.scss";
import { LoginForm } from "./widgets";

export function LoginPage() {
  return (
    <main className={styles.main}>
      <InnerHeader title="Tinder of Courseworks" />
      <LoginForm />
    </main>
  );
}
