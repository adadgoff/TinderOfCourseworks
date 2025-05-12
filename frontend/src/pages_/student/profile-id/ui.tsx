"use client";

import { notFound, useParams } from "next/navigation";
import { MOCK_STUDENTS } from "../../../../mocks/students";
import { Student } from "@/entities/student";
import { ProfileView } from "@/widgets/profile-view";
import { InnerHeader } from "@/widgets/header-inner";

export function StudentProfileIdPage() {
  const params = useParams();
  const { id } = params;

  const student: Student | undefined = MOCK_STUDENTS.find(
    (student) => student.id === id,
  );

  if (student === undefined) {
    notFound();
  }

  return (
    <>
      <InnerHeader title="Student Profile" />
      <ProfileView user={student} />
    </>
  );
}
