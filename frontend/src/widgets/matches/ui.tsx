"use client";

import { UserRole } from "@/entities/user/types";
import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { CourseworkSelect } from "../coursework-select";
import { CourseworkProfileView } from "../coursework-profile-view";
import { Hr } from "@/shared/ui/hr";
import { LikeButton, SkipButton } from "@/shared/ui/icon-button";
import { User } from "@/entities/types/user";
import Cookies from "js-cookie";
import { Coursework } from "@/entities/types/coursework";
import { notFound } from "next/navigation";
import {
  MatchSt2SvCw,
  MatchStCw2Sv,
  MatchSv2StCw,
  MatchSvCw2St,
} from "@/entities/types/matches";
import { CourseworkProfilePreview } from "../coursework-profile-preview";
import { getRoleUser } from "@/pages_/api/users";
import { getRoleCoursework } from "@/pages_/api/courseworks";
import { MatchType } from "@/entities/match/types";
import {
  postMatchSt2SvCw,
  postMatchStCw2Sv,
} from "@/pages_/api/student-matches";
import {
  postMatchSv2StCw,
  postMatchSvCw2St,
} from "@/pages_/api/supervisor-matches";

interface MatchInfo {
  coursework: Coursework;
  courseworkRole: UserRole;
  user: User;
  userRole: UserRole;
}

// <=> Incomes.
export function Matches({
  matches,
  role,
  token,
}: {
  matches: (MatchSt2SvCw | MatchStCw2Sv)[] | (MatchSv2StCw | MatchSvCw2St)[];
  role: UserRole;
  token: string;
}) {
  const [matchesInfo, setMatchesInfo] = useState<MatchInfo[]>([]);

  async function handleMatch({
    matchInfo,
    matchType,
  }: {
    matchInfo: MatchInfo;
    matchType: MatchType;
  }) {
    const { coursework, courseworkRole, user, userRole } = matchInfo;
    if (role === UserRole.Student) {
      if (
        userRole === UserRole.Supervisor &&
        courseworkRole === UserRole.Student
      ) {
        postMatchStCw2Sv({
          match: { stCwId: coursework.id!, svId: user.id, type: matchType },
          studentToken: token,
        });
      } else if (
        courseworkRole === UserRole.Supervisor &&
        userRole === UserRole.Student
      ) {
        postMatchSt2SvCw({
          match: { stId: user.id, svCwId: coursework.id!, type: matchType },
          studentToken: token,
        });
      }
    } else if (role === UserRole.Supervisor) {
      if (
        userRole === UserRole.Student &&
        courseworkRole === UserRole.Supervisor
      ) {
        postMatchSvCw2St({
          match: { svCwId: coursework.id!, stId: user.id, type: matchType },
          supervisorToken: token,
        });
      } else if (
        courseworkRole === UserRole.Student &&
        userRole === UserRole.Supervisor
      ) {
        postMatchSv2StCw({
          match: { svId: user.id, stCwId: coursework.id!, type: matchType },
          supervisorToken: token,
        });
      }
    }
  }

  useEffect(() => {
    async function fetchData() {
      const promises = matches.map(async (match) => {
        if (role === UserRole.Student) {
          if ("svId" in match && "stCwId" in match) {
            const [user, coursework] = await Promise.all([
              getRoleUser({ role: UserRole.Supervisor, userId: match.svId }),
              getRoleCoursework({
                courseworkId: match.stCwId,
                role: UserRole.Student,
              }),
            ]);
            return {
              coursework: coursework,
              courseworkRole: UserRole.Student,
              user: user,
              userRole: UserRole.Supervisor,
            };
          } else if ("svCwId" in match && "stId" in match) {
            const [user, coursework] = await Promise.all([
              getRoleUser({ role: UserRole.Student, userId: match.stId }),
              getRoleCoursework({
                courseworkId: match.svCwId,
                role: UserRole.Supervisor,
              }),
            ]);
            return {
              coursework: coursework,
              courseworkRole: UserRole.Supervisor,
              user: user,
              userRole: UserRole.Student,
            };
          }
        } else if (role === UserRole.Supervisor) {
          if ("stId" in match && "svCwId" in match) {
            const [user, coursework] = await Promise.all([
              getRoleUser({ role: UserRole.Student, userId: match.stId }),
              getRoleCoursework({
                courseworkId: match.svCwId,
                role: UserRole.Supervisor,
              }),
            ]);
            return {
              coursework: coursework,
              courseworkRole: UserRole.Supervisor,
              user: user,
              userRole: UserRole.Student,
            };
          } else if ("stCwId" in match && "svId" in match) {
            const [user, coursework] = await Promise.all([
              getRoleUser({ role: UserRole.Supervisor, userId: match.svId }),
              getRoleCoursework({
                courseworkId: match.stCwId,
                role: UserRole.Student,
              }),
            ]);
            return {
              coursework: coursework,
              courseworkRole: UserRole.Student,
              user: user,
              userRole: UserRole.Supervisor,
            };
          }
        }
        return null;
      });

      const results = await Promise.all(promises);
      setMatchesInfo(results.filter(Boolean) as MatchInfo[]);
    }

    fetchData();
  }, [matches, role]);

  return (
    <section className={styles.matches}>
      <div className={styles.leftMatches}>
        <span>{`Income matches: ${matches.length}`}</span>
      </div>

      {matchesInfo.map((matchInfo, index) => {
        const { coursework, user, userRole } = matchInfo;

        return (
          <form className={styles.match} key={index}>
            <CourseworkProfileView
              coursework={coursework}
              role={userRole}
              user={user}
            />
            <Hr className={styles.hr} />

            <div className={styles.buttons}>
              <LikeButton
                onLike={() =>
                  handleMatch({
                    matchInfo: matchInfo,
                    matchType: MatchType.Like,
                  })
                }
                type="button"
              />
              <SkipButton
                onSkip={() =>
                  handleMatch({
                    matchInfo: matchInfo,
                    matchType: MatchType.Skip,
                  })
                }
                type="button"
              />
            </div>
          </form>
        );
      })}
    </section>
  );
}
