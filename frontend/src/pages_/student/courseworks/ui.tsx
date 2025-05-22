"use client";

import { Coursework } from "@/entities/types/coursework";
import { Courseworks } from "@/widgets/courseworks";
import { InnerHeader } from "@/widgets/header-inner";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { notFound } from "next/navigation";
import { getPersonalCourseworks } from "@/pages_/api/courseworks";
import { UserRole } from "@/entities/user/types";

export function StudentCourseworksPage() {
  const [courseworks, setCourseworks] = useState<Coursework[]>([]);
  const studentToken = Cookies.get("studentToken");

  if (studentToken === undefined) {
    return notFound();
  }

  useEffect(
    function () {
      const fetchCourseworks = async function () {
        const courseworks = await getPersonalCourseworks({
          role: UserRole.Student,
          token: studentToken,
        });
        setCourseworks(courseworks);
      };

      fetchCourseworks();
    },
    [studentToken],
  );

  return (
    <>
      <InnerHeader
        buttonDecor="accent"
        buttonText="create coursework"
        href="/student/courseworks/create"
        iconName="courseworks/plus"
        openInNewTab={true}
        title="Courseworks"
      />
      <Courseworks courseworks={courseworks} role={UserRole.Student} />
    </>
  );
}
