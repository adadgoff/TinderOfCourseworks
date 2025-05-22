"use client";

import { Coursework } from "@/entities/types/coursework";
import { notFound, useParams } from "next/navigation";
import { InnerHeader } from "@/widgets/header-inner";
import { CourseworkCreateEditForm } from "@/widgets/coursework-create-edit-form";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { getRoleCoursework } from "@/pages_/api/courseworks";
import { UserRole } from "@/entities/user/types";

export function StudentCourseworksIdEditPage() {
  const params = useParams();
  const courseworkId = typeof params.id === "string" ? params.id : undefined;
  const studentToken = Cookies.get("studentToken");
  const [coursework, setCoursework] = useState<Coursework | null>(null);

  if (courseworkId === undefined) {
    return notFound();
  }
  if (studentToken === undefined) {
    return notFound();
  }

  useEffect(
    function () {
      const fetchCoursework = async function () {
        const coursework = await getRoleCoursework({
          courseworkId: courseworkId,
          role: UserRole.Student,
        });
        setCoursework(coursework);
      };

      fetchCoursework();
    },
    [studentToken],
  );

  return (
    <>
      <InnerHeader title="Edit Coursework" />
      {coursework && (
        <CourseworkCreateEditForm
          coursework={coursework}
          mode="edit"
          role={UserRole.Student}
          token={studentToken}
        />
      )}
    </>
  );
}
