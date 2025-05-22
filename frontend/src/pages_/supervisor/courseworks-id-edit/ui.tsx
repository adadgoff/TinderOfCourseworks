"use client";

import { Coursework } from "@/entities/types/coursework";
import { UserRole } from "@/entities/user/types";
import { getRoleCoursework } from "@/pages_/api/courseworks";
import { CourseworkCreateEditForm } from "@/widgets/coursework-create-edit-form";
import { InnerHeader } from "@/widgets/header-inner";
import Cookies from "js-cookie";
import { notFound, useParams } from "next/navigation";
import { useEffect, useState } from "react";

export function SupervisorCourseworksIdEditPage() {
  const params = useParams();
  const courseworkId = typeof params.id === "string" ? params.id : undefined;
  const supervisorToken = Cookies.get("supervisorToken");
  const [coursework, setCoursework] = useState<Coursework | null>(null);

  if (courseworkId === undefined) {
    return notFound();
  }
  if (supervisorToken === undefined) {
    return notFound();
  }

  useEffect(
    function () {
      const fetchCoursework = async function () {
        const coursework = await getRoleCoursework({
          role: UserRole.Supervisor,
          courseworkId: courseworkId,
        });
        setCoursework(coursework);
      };

      fetchCoursework();
    },
    [supervisorToken],
  );

  return (
    <>
      <InnerHeader title="Edit Coursework" />
      {coursework && (
        <CourseworkCreateEditForm
          coursework={coursework}
          mode="edit"
          role={UserRole.Supervisor}
          token={supervisorToken}
        />
      )}
    </>
  );
}
