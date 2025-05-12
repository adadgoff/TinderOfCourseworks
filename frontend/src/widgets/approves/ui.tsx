"use client";

import { SearchBar } from "@/shared/ui/search-bar";
import styles from "./styles.module.scss";
import { Approve } from "@/entities/approve";
import { MOCK_APPROVES } from "../../../mocks/approves";
import { User, UserRole } from "@/entities/user/types";
import { MOCK_STUDENTS } from "../../../mocks/students";
import { MOCK_SUPERVISORS } from "../../../mocks/supervisors";
import { DateTime } from "@/shared/components/date-time";
import { CourseworkProfilePreview } from "../coursework-profile-preview";
import { Coursework } from "@/entities/coursework";
import { MOCK_COURSEWORKS } from "../../../mocks/courseworks";
import { Hr } from "@/shared/ui/hr";
import { ContactInput } from "@/shared/components/contact-input";
import { Student } from "@/entities/student";

export function Approves({ role }: { role: UserRole }) {
  // TODO: get user (`useContext`) and matches (api call).
  const user: User =
    role === UserRole.Student ? MOCK_STUDENTS[0] : MOCK_SUPERVISORS[0];
  const approves: Approve[] = MOCK_APPROVES;

  return (
    <section className={styles.approvesContainer}>
      <SearchBar />
      <div className={styles.approves}>
        {approves.map((approve, index) => {
          const coursework: Coursework = MOCK_COURSEWORKS[0];
          const courseworkOwner: User =
            role === UserRole.Student ? MOCK_SUPERVISORS[0] : MOCK_STUDENTS[0];

          return (
            <article
              className={styles.approve}
              key={index} // TODO: key={`${coursework.id}_${courseworkOwner.id}`}
            >
              <div className={styles.courseworkProfile}>
                <DateTime dateTime={approve.dateTime} />
                <CourseworkProfilePreview
                  coursework={coursework}
                  user={courseworkOwner}
                />
              </div>

              <Hr className={styles.hr} />

              <div className={styles.contacts}>
                <ContactInput
                  contact={courseworkOwner.contact}
                  infoText={`Contact of ${courseworkOwner instanceof Student ? UserRole.Student : UserRole.Supervisor}.`}
                />
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
