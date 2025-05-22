"use client";

import { ProfileEditForm } from "@/widgets/profile-edit-form";
import { InnerHeader } from "@/widgets/header-inner";
import { useEffect, useState } from "react";
import { User } from "@/entities/types/user";
import Cookies from "js-cookie";
import { UserRole } from "@/entities/user/types";
import { notFound } from "next/navigation";
import { getPersonalRoleUser } from "@/pages_/api/users";

export function StudentProfileEditPage() {
  const studentToken = Cookies.get("studentToken");
  const [student, setStudent] = useState<User | null>(null);

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
      <InnerHeader title="Edit Profile" />
      {student && (
        <ProfileEditForm
          role={UserRole.Student}
          token={studentToken}
          user={student}
        />
      )}
    </>
  );
}
