"use client";

import { User } from "@/entities/types/user";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { notFound } from "next/navigation";
import { getPersonalRoleUser } from "@/pages_/api/users";
import { UserRole } from "@/entities/user/types";
import { InnerHeader } from "@/widgets/header-inner";
import { ProfileView } from "@/widgets/profile-view";

export default function SupervisorProfilePage() {
  const [supervisor, setSupervisor] = useState<User | null>(null);
  const supervisorToken = Cookies.get("supervisorToken");

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
      <InnerHeader
        buttonDecor="accent"
        buttonText="edit profile"
        href="/supervisor/profile/edit"
        iconName="common/edit"
        title="My Profile"
      />
      {supervisor && (
        <ProfileView role={UserRole.Supervisor} user={supervisor} />
      )}
    </>
  );
}
