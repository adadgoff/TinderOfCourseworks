"use client";

import { notFound, useParams } from "next/navigation";
import { ProfileView } from "@/widgets/profile-view";
import { InnerHeader } from "@/widgets/header-inner";
import Cookies from "js-cookie";
import { UserRole } from "@/entities/user/types";
import { useEffect, useState } from "react";
import { User } from "@/entities/types/user";
import { getRoleUser } from "@/pages_/api/users";

export function StudentProfileIdPage() {
  const params = useParams();
  const studentId = typeof params.id === "string" ? params.id : undefined;
  const [student, setStudent] = useState<User | null>(null);

  if (studentId === undefined) {
    return notFound();
  }

  useEffect(
    function () {
      const fetchStudent = async function () {
        const student = await getRoleUser({
          role: UserRole.Student,
          userId: studentId,
        });
        setStudent(student);
      };

      fetchStudent();
    },
    [studentId],
  );

  return (
    <>
      <InnerHeader title="Student Profile" />
      {student && <ProfileView role={UserRole.Student} user={student} />}
    </>
  );
}
