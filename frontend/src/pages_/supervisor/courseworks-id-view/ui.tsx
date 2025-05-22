"use client";

import { Coursework } from "@/entities/types/coursework";
import { notFound, useParams } from "next/navigation";
import { InnerHeader } from "@/widgets/header-inner";
import { CourseworkView } from "@/widgets/coursework-view";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { getRoleCoursework } from "@/pages_/api/courseworks";
import { UserRole } from "@/entities/user/types";

export function SupervisorCourseworksIdViewPage() {
  const params = useParams();
  const courseworkId = typeof params.id === "string" ? params.id : undefined;
  const [coursework, setCoursework] = useState<Coursework | null>(null);

  if (courseworkId === undefined) {
    return notFound();
  }

  useEffect(
    function () {
      const fetchCoursework = async function () {
        const coursework = await getRoleCoursework({
          courseworkId: courseworkId,
          role: UserRole.Supervisor,
        });
        setCoursework(coursework);
      };

      fetchCoursework();
    },
    [courseworkId],
  );

  return (
    <>
      <InnerHeader title="View Coursework" />
      {coursework && <CourseworkView coursework={coursework} />}
    </>
  );
}
