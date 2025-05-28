"use client";

import { Coursework } from "@/entities/types/coursework";
import { User } from "@/entities/types/user";
import { UserRole } from "@/entities/user/types";
import { getPersonalCourseworks } from "@/pages_/api/courseworks";
import { getPersonalRoleUser } from "@/pages_/api/users";
import { Explore } from "@/widgets/explore";
import { InnerHeader } from "@/widgets/header-inner";
import Cookies from "js-cookie";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";

export function StudentExplorePage() {
  const studentToken = Cookies.get("studentToken");
  const [studentCourseworks, setStudentCourseworks] = useState<Coursework[]>(
    [],
  );
  const [student, setStudent] = useState<User | null>(null);
  const [selectedStudentCoursework, setSelectedStudentCoursework] =
    useState<Coursework | null>(null);

  if (studentToken === undefined) {
    return notFound();
  }

  useEffect(
    function () {
      const fetchData = async () => {
        const [student, studentCourseworks] = await Promise.all([
          getPersonalRoleUser({ role: UserRole.Student, token: studentToken }),
          getPersonalCourseworks({
            role: UserRole.Student,
            token: studentToken,
          }),
        ]);

        setStudent(student);
        setStudentCourseworks(studentCourseworks);
      };

      fetchData();
    },
    [studentToken],
  );

  return (
    <>
      <InnerHeader title="Explore" />
      {student && (
        <Explore
          role={UserRole.Student}
          selectedUserCoursework={selectedStudentCoursework}
          setSelectedUserCoursework={setSelectedStudentCoursework}
          token={studentToken}
          user={student}
          userCourseworks={studentCourseworks}
        />
      )}
    </>
  );
}
