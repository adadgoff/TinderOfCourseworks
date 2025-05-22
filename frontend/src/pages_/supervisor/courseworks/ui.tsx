"use client";

import { Courseworks } from "@/widgets/courseworks";
import { InnerHeader } from "@/widgets/header-inner";
import { Coursework } from "@/entities/types/coursework";
import Cookies from "js-cookie";
import { getPersonalCourseworks } from "@/pages_/api/courseworks";
import { UserRole } from "@/entities/user/types";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";

export function SupervisorCourseworksPage() {
  const [courseworks, setCourseworks] = useState<Coursework[]>([]);
  const supervisorToken = Cookies.get("supervisorToken");

  if (supervisorToken === undefined) {
    return notFound();
  }

  useEffect(
    function () {
      const fetchCourseworks = async function () {
        const courseworks = await getPersonalCourseworks({
          role: UserRole.Supervisor,
          token: supervisorToken,
        });
        setCourseworks(courseworks);
      };

      fetchCourseworks();
    },
    [supervisorToken],
  );

  return (
    <>
      <InnerHeader
        buttonDecor="accent"
        buttonText="create coursework"
        href="/supervisor/courseworks/create"
        iconName="courseworks/plus"
        openInNewTab={true}
        title="Courseworks"
      />
      <Courseworks courseworks={courseworks} role={UserRole.Supervisor} />
    </>
  );
}
