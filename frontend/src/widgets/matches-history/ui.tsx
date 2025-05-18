"use client";

import styles from "./styles.module.scss";
import { User, UserRole } from "@/entities/user/types";
import { ActionHeader } from "../header-action";
import { MOCK_STUDENTS } from "../../../mocks/students";
import { SearchBar } from "@/shared/ui/search-bar";
import { Coursework } from "@/entities/coursework";
import { MOCK_COURSEWORKS } from "../../../mocks/courseworks";
import { MOCK_SUPERVISORS } from "../../../mocks/supervisors";
import { CourseworkProfilePreview } from "../coursework-profile-preview";
import { DateTime } from "@/shared/components/date-time";
import { Match, MatchType } from "@/entities/match/types";
import { MOCK_MATCHES } from "../../../mocks/matches";
import { St2SvCwMatch, Sv2StCwMatch } from "@/entities/match";
import { Hr } from "@/shared/ui/hr";
import { LikeButton, SkipButton } from "@/shared/ui/icon-button";

export function MatchesHistory({ role }: { role: UserRole }) {
  // TODO: get user (`useContext`) and matches (api call).
  const user: User =
    role === UserRole.Student ? MOCK_STUDENTS[0] : MOCK_SUPERVISORS[0];
  const matches: Match[] = MOCK_MATCHES.filter((match) => {
    if (role === UserRole.Student) {
      return (match as St2SvCwMatch).stId === user.id;
    } else {
      return (match as Sv2StCwMatch).svId === user.id;
    }
  });

  function getCourseworkForMatch(match: Match): Coursework {
    if (role === UserRole.Student) {
      const svCwId = (match as St2SvCwMatch).svCwId.split("_")[1];
      return MOCK_COURSEWORKS.find((cw) => cw.id === svCwId)!;
    }
    const stCwId = (match as Sv2StCwMatch).stCwId.split("_")[1];
    return MOCK_COURSEWORKS.find((cw) => cw.id === stCwId)!;
  }

  function getUserForMatch(match: Match): User {
    if (role === UserRole.Student) {
      const svId = (match as St2SvCwMatch).svCwId.split("_")[0];
      return MOCK_SUPERVISORS.find((sv) => sv.id === svId)!;
    }
    const stId = (match as Sv2StCwMatch).stCwId.split("_")[0];
    return MOCK_STUDENTS.find((st) => st.id === stId)!;
  }

  return (
    <section className={styles.matchesHistory}>
      <ActionHeader backUrl={`/${role}/matches`} />
      {/* TODO: implement. */}
      {/* <SearchBar /> */}
      <div className={styles.matches}>
        {matches.map((match) => {
          const coursework = getCourseworkForMatch(match);
          const matchedUser = getUserForMatch(match);

          return (
            <form key={match.id} className={styles.match}>
              <div className={styles.courseworkProfile}>
                <DateTime datetime={match.createdAt} />
                <CourseworkProfilePreview
                  coursework={coursework}
                  user={matchedUser}
                />
              </div>

              <Hr className={styles.hr} />

              <div className={styles.buttons}>
                <LikeButton
                  isActive={match.type === MatchType.LIKE}
                  onLike={() => {}}
                  type="button"
                />
                <SkipButton
                  isActive={match.type === MatchType.SKIP}
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
