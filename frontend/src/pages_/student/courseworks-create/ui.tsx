"use client";

import { InnerHeader } from "@/widgets/header-inner";
import { CourseworkCreateEditForm } from "@/widgets/coursework-create-edit-form";
import { UserRole } from "@/entities/user/types";
import Cookies from "js-cookie";
import { notFound } from "next/navigation";

export function StudentCourseworksCreatePage() {
  const studentToken = Cookies.get("studentToken");

  if (studentToken === undefined) {
    return notFound();
  }

  return (
    <>
      <InnerHeader title="Create Coursework" />
      <CourseworkCreateEditForm
        mode="create"
        role={UserRole.Student}
        token={studentToken}
      />
    </>
  );
}
