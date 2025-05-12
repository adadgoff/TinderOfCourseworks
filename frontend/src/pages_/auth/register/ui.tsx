import { InnerHeader } from "@/widgets/header-inner";
import styles from "./styles.module.scss";
import { RegisterForm } from "./widgets";

export function RegisterPage() {
  return (
    <main className={styles.main}>
      <InnerHeader title="Tinder of Courseworks" />
      <RegisterForm />
    </main>
  );
}
