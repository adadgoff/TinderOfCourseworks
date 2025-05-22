"use client";

import { User } from "@/entities/types/user";
import { InnerHeader } from "@/widgets/header-inner";
import { ProfileView } from "@/widgets/profile-view";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { notFound } from "next/navigation";
import { getPersonalRoleUser } from "@/pages_/api/users";
import { UserRole } from "@/entities/user/types";

export function StudentProfilePage() {
  const [student, setStudent] = useState<User | null>(null);
  const studentToken = Cookies.get("studentToken");

  if (studentToken === undefined) {
    return notFound();
  }

  useEffect(
    function () {
      const fetchStudent = async function () {
        const student = await getPersonalRoleUser({
          role: UserRole.Student,
          token: studentToken,
        });
        setStudent(student);
      };

      fetchStudent();
    },
    [studentToken],
  );

  return (
    <>
      <InnerHeader
        buttonDecor="accent"
        buttonText="edit profile"
        href="/student/profile/edit"
        iconName="common/edit"
        title="My Profile"
      />
      {student && <ProfileView role={UserRole.Student} user={student} />}
    </>
  );
}
