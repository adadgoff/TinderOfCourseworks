"use client";

import { ApproveSt2SvCw, ApproveSv2StCw } from "@/entities/types/matches";
import { UserRole } from "@/entities/user/types";
import { getRoleApproves } from "@/pages_/api/matches";
import { Approves } from "@/widgets/approves";
import { InnerHeader } from "@/widgets/header-inner";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { notFound } from "next/navigation";

export default function SupervisorApprovesPage() {
  const [approves, setApproves] = useState<(ApproveSt2SvCw | ApproveSv2StCw)[]>(
    [],
  );
  const supervisorToken = Cookies.get("supervisorToken");

  if (supervisorToken === undefined) {
    return notFound();
  }

  useEffect(
    function () {
      const fetchApproves = async function () {
        const approves = await getRoleApproves({
          role: UserRole.Supervisor,
          token: supervisorToken,
        });
        setApproves(approves);
      };

      fetchApproves();
    },
    [supervisorToken],
  );

  return (
    <>
      <InnerHeader title="Approves" />
      <Approves approves={approves} />
    </>
  );
}
