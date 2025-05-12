import { UserRole } from "@/entities/user/types";
import styles from "./styles.module.scss";
import { AuthCard } from "./ui/auth-card";

export function Auth() {
  return (
    <section className={styles.auth}>
      <img alt="auth-image" src="/images/menu/matrix.png" />
      <div className={styles.cards}>
        <AuthCard
          role={UserRole.Student}
          iconName={`main/${UserRole.Student}`}
          listItems={[
            "Create coursework and find a supervisor for it",
            "Find coursework from academic supervisors",
          ]}
        />
        <AuthCard
          role={UserRole.Supervisor}
          iconName={`main/${UserRole.Supervisor}`}
          listItems={[
            "Create coursework and find student for it",
            "Become a supervisor for initiative course work",
          ]}
        />
      </div>
    </section>
  );
}
