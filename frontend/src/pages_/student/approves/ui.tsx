"use client";

import { ApproveSt2SvCw, ApproveSv2StCw } from "@/entities/types/matches";
import { UserRole } from "@/entities/user/types";
import { getRoleApproves } from "@/pages_/api/matches";
import { Approves } from "@/widgets/approves";
import { InnerHeader } from "@/widgets/header-inner";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { notFound } from "next/navigation";

export function StudentApprovesPage() {
  const [approves, setApproves] = useState<(ApproveSt2SvCw | ApproveSv2StCw)[]>(
    [],
  );
  const studentToken = Cookies.get("studentToken");

  if (studentToken === undefined) {
    return notFound();
  }

  useEffect(
    function () {
      const fetchApproves = async function () {
        const approves = await getRoleApproves({
          role: UserRole.Student,
          token: studentToken,
        });
        setApproves(approves);
      };

      fetchApproves();
    },
    [studentToken],
  );

  return (
    <>
      <InnerHeader title="Approves" />
      <Approves approves={approves} />
    </>
  );
}
