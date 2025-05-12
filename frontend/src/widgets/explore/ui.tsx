"use client";

import styles from "./styles.module.scss";
import { MOCK_COURSEWORKS } from "../../../mocks/courseworks";
import { useState } from "react";
import { Coursework } from "@/entities/coursework";
import { CourseworkProfileView } from "../coursework-profile-view";
import { User, UserRole } from "@/entities/user/types";
import { MOCK_STUDENTS } from "../../../mocks/students";
import { MOCK_SUPERVISORS } from "../../../mocks/supervisors";
import { CourseworkSelect } from "../coursework-select";
import { LikeButton, SkipButton } from "@/shared/ui/icon-button";
import { Hr } from "@/shared/ui/hr";

export function Explore({ role }: { role: UserRole }) {
  // TODO: get user (`useContext`) and user courseworks (api).
  const user: User = MOCK_STUDENTS[0];
  const courseworks: Coursework[] = MOCK_COURSEWORKS;
  const [userCurrentCoursework, setUserCurrentCoursework] =
    useState<Coursework | null>(null);

  const recommendedCoursework: Coursework = MOCK_COURSEWORKS[1];
  const recommendedCourseworkOwner: User = MOCK_SUPERVISORS[1];
  const recommendedOppositeRoleUserForCurrentCoursework: User =
    MOCK_SUPERVISORS[2];

  return (
    <section className={styles.explore}>
      <CourseworkSelect
        currentCoursework={userCurrentCoursework}
        courseworks={courseworks}
        setCurrentCoursework={setUserCurrentCoursework}
      />

      <form className={styles.match}>
        {userCurrentCoursework === null ? (
          <CourseworkProfileView
            coursework={recommendedCoursework}
            user={recommendedCourseworkOwner}
          />
        ) : (
          <CourseworkProfileView
            coursework={userCurrentCoursework}
            user={recommendedOppositeRoleUserForCurrentCoursework}
          />
        )}

        <Hr className={styles.hr} />

        <div className={styles.buttons}>
          <LikeButton onLike={() => {}} type="button" />
          <SkipButton onSkip={() => {}} type="button" />
        </div>
      </form>
    </section>
  );
}
