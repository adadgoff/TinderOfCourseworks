"use client";

import {
  MatchSt2SvCw,
  MatchStCw2Sv,
  MatchSv2StCw,
  MatchSvCw2St,
} from "@/entities/types/matches";
import { UserRole } from "@/entities/user/types";
import { getSupervisorIncomeMatches } from "@/pages_/api/supervisor-matches";
import { InnerHeader } from "@/widgets/header-inner";
import { Matches } from "@/widgets/matches";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { notFound } from "next/navigation";

export default function SupervisorMatchesPage() {
  const supervisorToken = Cookies.get("supervisorToken");
  const [matches, setMatches] = useState<
    (MatchSt2SvCw | MatchStCw2Sv | MatchSv2StCw | MatchSvCw2St)[]
  >([]);

  if (supervisorToken === undefined) {
    return notFound();
  }

  useEffect(
    function () {
      const fetchMatches = async function () {
        const matches = await getSupervisorIncomeMatches({
          supervisorToken: supervisorToken,
        });
        setMatches(matches);
      };

      fetchMatches();
    },
    [supervisorToken],
  );

  return (
    <>
      <InnerHeader
        buttonDecor="grey"
        buttonText="history"
        href="/supervisor/matches/history"
        iconName="common/history"
        openInNewTab={true}
        title="Matches"
      />
      <Matches
        matches={matches}
        role={UserRole.Supervisor}
        token={supervisorToken}
      />
    </>
  );
}
