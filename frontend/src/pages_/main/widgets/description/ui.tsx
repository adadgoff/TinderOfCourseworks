import styles from "./styles.module.scss";

export function Description() {
  return (
    <section className={styles.description}>
      <article>
        <p>
          <strong>Tinder of Courseworks</strong> is an innovative platform
          designed to connect students and academic supervisors, making it
          easier to find the perfect match for coursework, research projects, or
          thesis guidance.
        </p>
      </article>

      <article>
        <h2>Key Features</h2>
        <div className={styles.features}>
          <div>
            <h3>For Students</h3>
            <ul>
              <li>Find supervisors or advisors for your coursework/thesis.</li>
              <li>Browse available projects and research topics.</li>
              <li>Get matched based on academic interests and expertise.</li>
            </ul>
          </div>
          <div>
            <h3>For Supervisors (Professors/Researchers)</h3>
            <ul>
              <li>
                Discover motivated students for your research or coursework
                projects.
              </li>
              <li>Propose your own topics and attract suitable candidates.</li>
              <li>Streamline academic mentorship with smart matching.</li>
            </ul>
          </div>
        </div>
      </article>
    </section>
  );
}
