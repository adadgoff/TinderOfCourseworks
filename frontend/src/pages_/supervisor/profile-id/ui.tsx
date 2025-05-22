"use client";

import { notFound, useParams } from "next/navigation";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { User } from "@/entities/types/user";
import { getRoleUser } from "@/pages_/api/users";
import { UserRole } from "@/entities/user/types";
import { InnerHeader } from "@/widgets/header-inner";
import { ProfileView } from "@/widgets/profile-view";

export function SupervisorProfileIdPage() {
  const params = useParams();
  const supervisorId = typeof params.id === "string" ? params.id : undefined;
  const [supervisor, setSupervisor] = useState<User | null>(null);

  if (supervisorId === undefined) {
    return notFound();
  }

  useEffect(
    function () {
      const fetchSupervisor = async function () {
        const supervisor = await getRoleUser({
          role: UserRole.Supervisor,
          userId: supervisorId,
        });
        setSupervisor(supervisor);
      };

      fetchSupervisor();
    },
    [supervisorId],
  );

  return (
    <>
      <InnerHeader title="Supervisor Profile" />
      {supervisor && (
        <ProfileView role={UserRole.Supervisor} user={supervisor} />
      )}
    </>
  );
}
