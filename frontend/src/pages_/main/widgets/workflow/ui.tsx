import styles from "./styles.module.scss";
import { Step } from "./ui/step";

export function WorkFlow() {
  return (
    <section className={styles.workFlow}>
      <h2>How it works</h2>
      <div className={styles.steps}>
        <div className={styles.column}>
          <Step
            stepNumber={1}
            iconName="main/compass"
            text="Explore & Match courseworks"
          />
          <Step
            stepNumber={2}
            iconName="main/handshake"
            text="Approve choice"
          />
        </div>
        <div className={styles.column}>
          <Step
            stepNumber={3}
            iconName="main/communicate"
            text="Share contacts and communicate"
          />
          <Step
            stepNumber={4}
            iconName="main/success"
            text="Success! Have fun!"
          />
        </div>
      </div>
    </section>
  );
}
