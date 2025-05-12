"use client"; // TODO: for future `useContext`.

import { Student } from "@/entities/student";
import { InnerHeader } from "@/widgets/header-inner";
import { ProfileView } from "@/widgets/profile-view";
import { MOCK_STUDENTS } from "../../../../mocks/students";

export function StudentProfilePage() {
  const student: Student = MOCK_STUDENTS[0];

  return (
    <>
      <InnerHeader
        buttonDecor="accent"
        buttonText="edit profile"
        href="/student/profile/edit"
        iconName="common/edit"
        title="My Profile"
      />
      <ProfileView user={student} />
    </>
  );
}
