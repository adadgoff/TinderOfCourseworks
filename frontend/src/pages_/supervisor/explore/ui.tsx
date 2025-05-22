"use client";

import { User } from "@/entities/types/user";
import { UserRole } from "@/entities/user/types";
import { Explore } from "@/widgets/explore";
import { InnerHeader } from "@/widgets/header-inner";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Coursework } from "@/entities/types/coursework";
import { notFound } from "next/navigation";
import { getPersonalCourseworks } from "@/pages_/api/courseworks";
import { getPersonalRoleUser } from "@/pages_/api/users";

export default function SupervisorExplorePage() {
  const supervisorToken = Cookies.get("supervisorToken");
  const [supervisorCourseworks, setSupervisorCourseworks] = useState<
    Coursework[]
  >([]);
  const [supervisor, setSupervisor] = useState<User | null>(null);
  const [selectedSupervisorCoursework, setSelectedSupervisorCoursework] =
    useState<Coursework | null>(null);

  if (supervisorToken === undefined) {
    return notFound();
  }

  useEffect(
    function () {
      const fetchData = async () => {
        const [supervisor, supervisorCourseworks] = await Promise.all([
          getPersonalRoleUser({
            role: UserRole.Supervisor,
            token: supervisorToken,
          }),
          getPersonalCourseworks({
            role: UserRole.Supervisor,
            token: supervisorToken,
          }),
        ]);

        setSupervisor(supervisor);
        setSupervisorCourseworks(supervisorCourseworks);
      };

      fetchData();
    },
    [supervisorToken],
  );

  return (
    <>
      <InnerHeader title="Explore" />
      {supervisor && (
        <Explore
          role={UserRole.Supervisor}
          selectedUserCoursework={selectedSupervisorCoursework}
          setSelectedUserCoursework={setSelectedSupervisorCoursework}
          token={supervisorToken}
          user={supervisor}
          userCourseworks={supervisorCourseworks}
        />
      )}
    </>
  );
}
