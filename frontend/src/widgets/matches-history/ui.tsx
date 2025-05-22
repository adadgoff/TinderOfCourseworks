"use client";

import {
  MatchSt2SvCw,
  MatchStCw2Sv,
  MatchSv2StCw,
  MatchSvCw2St,
} from "@/entities/types/matches";
import styles from "./styles.module.scss";
import { UserRole } from "@/entities/user/types";
import { ActionHeader } from "../header-action";
import { SearchBar } from "@/shared/ui/search-bar";
import { CourseworkProfilePreview } from "../coursework-profile-preview";
import { DateTime } from "@/shared/components/date-time";
import { MatchType } from "@/entities/match/types";
import { Hr } from "@/shared/ui/hr";
import { LikeButton, SkipButton } from "@/shared/ui/icon-button";
import { useEffect, useState } from "react";
import { Coursework } from "@/entities/types/coursework";
import { User } from "@/entities/types/user";
import { getRoleUser } from "@/pages_/api/users";
import { getRoleCoursework } from "@/pages_/api/courseworks";

interface MatchInfo {
  coursework: Coursework;
  courseworkRole: UserRole;
  user: User;
  userRole: UserRole;
}

// <=> Outcomes.
export function MatchesHistory({
  matches,
  role,
}: {
  matches: (MatchSt2SvCw | MatchStCw2Sv)[] | (MatchSv2StCw | MatchSvCw2St)[];
  role: UserRole;
}) {
  const [matchesInfo, setMatchesInfo] = useState<MatchInfo[]>([]);

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
    <section className={styles.matchesHistory}>
      <ActionHeader backUrl={`/${role}/matches`} />
      {/* TODO: implement. */}
      {/* <SearchBar /> */}
      <div className={styles.matches}>
        <div className={styles.leftMatches}>
          <span>{`Outcome matches: ${matches.length}`}</span>
        </div>

        {matchesInfo.map((matchInfo, index) => {
          const { coursework, courseworkRole, user, userRole } = matchInfo;

          return (
            <form className={styles.match} key={index}>
              <div className={styles.courseworkProfile}>
                <DateTime datetime={matches[index].matchedAt!} />
                <CourseworkProfilePreview
                  coursework={coursework}
                  user={user}
                  courseworkHref={`/${courseworkRole}/courseworks/${coursework.id}/view`}
                  userHref={`/${userRole}/profile/${user.id}`}
                />
              </div>
              <Hr className={styles.hr} />
              <div className={styles.buttons}>
                <LikeButton
                  disabled={true}
                  isActive={matches[index].type === MatchType.Like}
                  onLike={() => {}}
                  type="button"
                />
                <SkipButton
                  disabled={true}
                  isActive={matches[index].type === MatchType.Skip}
                  onSkip={() => {}}
                  type="button"
                />
              </div>
            </form>
          );
        })}
      </div>
    </section>
  );
}
