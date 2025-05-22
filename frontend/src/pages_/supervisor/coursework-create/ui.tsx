"use client";

import { UserRole } from "@/entities/user/types";
import { CourseworkCreateEditForm } from "@/widgets/coursework-create-edit-form";
import { InnerHeader } from "@/widgets/header-inner";
import Cookies from "js-cookie";
import { notFound } from "next/navigation";

export function SupervisorCourseworksCreatePage() {
  const supervisorToken = Cookies.get("supervisorToken");

  if (supervisorToken === undefined) {
    return notFound();
  }

  return (
    <>
      <InnerHeader title="Create Coursework" />
      <CourseworkCreateEditForm
        mode="create"
        role={UserRole.Supervisor}
        token={supervisorToken}
      />
    </>
  );
}
