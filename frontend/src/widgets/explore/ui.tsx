"use client";

import styles from "./styles.module.scss";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Coursework } from "@/entities/types/coursework";
import { CourseworkProfileView } from "../coursework-profile-view";
import { UserRole } from "@/entities/user/types";
import { CourseworkSelect } from "../coursework-select";
import { LikeButton, SkipButton } from "@/shared/ui/icon-button";
import { Hr } from "@/shared/ui/hr";
import { User } from "@/entities/types/user";
import { getRoleUser } from "@/pages_/api/users";
import { getRoleCoursework } from "@/pages_/api/courseworks";
import {
  recommendSt,
  recommendStCw,
  recommendSv,
  recommendSvCw,
} from "@/pages_/api/recsys";
import { MatchType } from "@/entities/match/types";
import {
  postMatchSt2SvCw,
  postMatchStCw2Sv,
} from "@/pages_/api/student-matches";
import {
  postMatchSv2StCw,
  postMatchSvCw2St,
} from "@/pages_/api/supervisor-matches";

interface Recommendation {
  coursework: Coursework | null;
  user: User;
  userRole: UserRole | null;
}

export function Explore({
  role,
  selectedUserCoursework,
  setSelectedUserCoursework,
  token,
  user,
  userCourseworks,
}: {
  role: UserRole;
  selectedUserCoursework: Coursework | null;
  setSelectedUserCoursework: Dispatch<SetStateAction<Coursework | null>>;
  token: string;
  user: User;
  userCourseworks: Coursework[];
}) {
  const [recommendation, setRecommendation] = useState<Recommendation>({
    coursework: null,
    user: user,
    userRole: null,
  });

  async function fetchRecommendation() {
    if (role === UserRole.Student) {
      if (selectedUserCoursework === null) {
        const recSvCw = await recommendSvCw({ studentToken: token });
        if (recSvCw === null) {
          setRecommendation({ coursework: null, user: user, userRole: null });
          return;
        }
        const supervisorCoursework = await getRoleCoursework({
          courseworkId: recSvCw.svCwId,
          role: UserRole.Supervisor,
        });
        setRecommendation({
          coursework: supervisorCoursework,
          user: user,
          userRole: UserRole.Student,
        });
      } else {
        const recSv = await recommendSv({
          stCwId: selectedUserCoursework.id!,
          studentToken: token,
        });
        if (recSv === null) {
          setRecommendation({ coursework: null, user: user, userRole: null });
          return;
        }
        const supervisor = await getRoleUser({
          role: UserRole.Supervisor,
          userId: recSv.svId,
        });
        setRecommendation({
          coursework: selectedUserCoursework,
          user: supervisor,
          userRole: UserRole.Student,
        });
      }
    } else if (role === UserRole.Supervisor) {
      if (selectedUserCoursework === null) {
        const recStCw = await recommendStCw({ supervisorToken: token });
        if (recStCw === null) {
          setRecommendation({ coursework: null, user: user, userRole: null });
          return;
        }
        const studentCoursework = await getRoleCoursework({
          courseworkId: recStCw.stCwId,
          role: UserRole.Student,
        });
        setRecommendation({
          coursework: studentCoursework,
          user: user,
          userRole: UserRole.Supervisor,
        });
      } else {
        const recSt = await recommendSt({
          svCwId: selectedUserCoursework.id!,
          supervisorToken: token,
        });
        if (recSt === null) {
          setRecommendation({ coursework: null, user: user, userRole: null });
          return;
        }
        const student = await getRoleUser({
          role: UserRole.Student,
          userId: recSt.stId,
        });
        setRecommendation({
          coursework: selectedUserCoursework,
          user: student,
          userRole: UserRole.Supervisor,
        });
      }
    }
  }

  useEffect(() => {
    fetchRecommendation();
  }, [selectedUserCoursework, token]);

  async function handleMatch({ matchType }: { matchType: MatchType }) {
    if (!recommendation.coursework || !recommendation.user) return;

    if (role === UserRole.Student) {
      if (selectedUserCoursework === null) {
        await postMatchSt2SvCw({
          match: {
            stId: recommendation.user.id,
            svCwId: recommendation.coursework.id!,
            type: matchType,
          },
          studentToken: token,
        });
      } else {
        await postMatchStCw2Sv({
          match: {
            stCwId: recommendation.coursework.id!,
            svId: recommendation.user.id,
            type: matchType,
          },
          studentToken: token,
        });
      }
    } else if (role === UserRole.Supervisor) {
      if (selectedUserCoursework === null) {
        await postMatchSv2StCw({
          match: {
            stCwId: recommendation.coursework.id!,
            svId: recommendation.user.id,
            type: matchType,
          },
          supervisorToken: token,
        });
      } else {
        await postMatchSvCw2St({
          match: {
            stId: recommendation.user.id,
            svCwId: recommendation.coursework.id!,
            type: matchType,
          },
          supervisorToken: token,
        });
      }
    }
    await fetchRecommendation();
  }

  return (
    <section className={styles.explore}>
      <CourseworkSelect
        currentCoursework={selectedUserCoursework}
        courseworks={userCourseworks}
        setCurrentCoursework={setSelectedUserCoursework}
      />
      {recommendation.coursework && recommendation.userRole ? (
        <form className={styles.match}>
          <CourseworkProfileView
            coursework={recommendation.coursework}
            role={recommendation.userRole}
            user={recommendation.user}
          />

          <Hr className={styles.hr} />

          <div className={styles.buttons}>
            <LikeButton
              onLike={() => handleMatch({ matchType: MatchType.Like })}
              type="button"
            />
            <SkipButton
              onSkip={() => handleMatch({ matchType: MatchType.Skip })}
              type="button"
            />
          </div>
        </form>
      ) : (
        <div>No recommendation</div>
      )}
    </section>
  );
}
