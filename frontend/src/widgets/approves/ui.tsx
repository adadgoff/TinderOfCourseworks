"use client";

import { SearchBar } from "@/shared/ui/search-bar";
import styles from "./styles.module.scss";
import { DateTime } from "@/shared/components/date-time";
import { CourseworkProfilePreview } from "../coursework-profile-preview";
import { Hr } from "@/shared/ui/hr";
import { ContactInput } from "@/shared/components/contact-input";
import { ApproveSt2SvCw, ApproveSv2StCw } from "@/entities/types/matches";
import { Coursework } from "@/entities/types/coursework";
import { User } from "@/entities/types/user";
import { UserRole } from "@/entities/user/types";
import { getRoleCoursework } from "@/pages_/api/courseworks";
import { getRoleUser } from "@/pages_/api/users";
import { useEffect, useState } from "react";
import { UUID } from "@/shared/types";

interface ApproveInfo {
  cw: Coursework;
  cwRole: UserRole;
  user: User;
  userRole: UserRole;
}

export function Approves({
  approves,
}: {
  approves: (ApproveSt2SvCw | ApproveSv2StCw)[];
}) {
  const [approvesInfo, setApprovesInfo] = useState<ApproveInfo[]>([]);

  useEffect(
    function () {
      async function fetchData() {
        const result: ApproveInfo[] = [];

        for (const approve of approves) {
          if ("stId" in approve && "svCwId" in approve) {
            const [user, coursework] = await Promise.all([
              getRoleUser({
                role: UserRole.Student,
                userId: approve.stId,
              }),
              getRoleCoursework({
                courseworkId: approve.svCwId,
                role: UserRole.Supervisor,
              }),
            ]);

            result.push({
              cw: coursework,
              cwRole: UserRole.Supervisor,
              user: user,
              userRole: UserRole.Student,
            });
          } else if ("svId" in approve && "stCwId" in approve) {
            const [user, coursework] = await Promise.all([
              getRoleUser({
                role: UserRole.Supervisor,
                userId: approve.svId,
              }),
              getRoleCoursework({
                courseworkId: approve.stCwId,
                role: UserRole.Student,
              }),
            ]);

            result.push({
              cw: coursework,
              cwRole: UserRole.Student,
              user: user,
              userRole: UserRole.Supervisor,
            });
          }
        }

        setApprovesInfo(result);
      }

      fetchData();
    },
    [approves],
  );

  return (
    <section className={styles.approvesContainer}>
      {/* TODO: implement. */}
      {/* <SearchBar /> */}
      <div className={styles.approvesCounter}>
        <span>{`Approves: ${approves.length}`}</span>
      </div>

      <div className={styles.approves}>
        {approvesInfo.map((approveInfo, index) => {
          const { cw, cwRole, user, userRole } = approveInfo;

          return (
            <article className={styles.approve} key={`${cw.id}_${user.id}`}>
              <div className={styles.courseworkProfile}>
                <DateTime datetime={approves[index].approvedAt} />
                <CourseworkProfilePreview
                  coursework={cw}
                  courseworkHref={`/${cwRole}/courseworks/${cw.id}/view`}
                  user={user}
                  userHref={`/${userRole}/profile/${user.id}`}
                />
              </div>

              <Hr className={styles.hr} />

              <div className={styles.contacts}>
                <ContactInput
                  contact={user.contact}
                  infoText={`Contact of ${userRole}.`}
                />
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
