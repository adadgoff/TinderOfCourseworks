import { InnerHeader } from "@/widgets/header-inner";
import styles from "./styles.module.scss";
import { Auth, Description, WorkFlow } from "./widgets";

export function MainPage() {
  return (
    <main className={styles.main}>
      <InnerHeader title="Tinder of Courseworks" />
      <Description />
      <WorkFlow />
      <Auth />
    </main>
  );
}
