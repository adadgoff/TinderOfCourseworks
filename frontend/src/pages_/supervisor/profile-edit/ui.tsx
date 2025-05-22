"use client";

import { User } from "@/entities/types/user";
import { UserRole } from "@/entities/user/types";
import { getPersonalRoleUser } from "@/pages_/api/users";
import { InnerHeader } from "@/widgets/header-inner";
import { ProfileEditForm } from "@/widgets/profile-edit-form";
import Cookies from "js-cookie";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";

export function SupervisorProfileEditPage() {
  const supervisorToken = Cookies.get("supervisorToken");
  const [supervisor, setSupervisor] = useState<User | null>(null);

  if (supervisorToken === undefined) {
    return notFound();
  }

  useEffect(
    function () {
      const fetchSupervisor = async function () {
        const supervisor = await getPersonalRoleUser({
          role: UserRole.Supervisor,
          token: supervisorToken,
        });
        setSupervisor(supervisor);
      };

      fetchSupervisor();
    },
    [supervisorToken],
  );

  return (
    <>
      <InnerHeader title="Edit Profile" />
      {supervisor && (
        <ProfileEditForm
          role={UserRole.Supervisor}
          token={supervisorToken}
          user={supervisor}
        />
      )}
    </>
  );
}
