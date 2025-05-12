"use client"; // TODO: for future work with API.

import { Student } from "@/entities/student";
import { ProfileEditForm } from "@/widgets/profile-edit-form";
import { MOCK_STUDENTS } from "../../../../mocks/students";
import { InnerHeader } from "@/widgets/header-inner";

export function StudentProfileEditPage() {
  const student: Student = MOCK_STUDENTS[0];

  return (
    <>
      <InnerHeader title="Edit Profile" />
      <ProfileEditForm user={student} />
    </>
  );
}
