"use client";

import {
  MatchSt2SvCw,
  MatchStCw2Sv,
  MatchSv2StCw,
  MatchSvCw2St,
} from "@/entities/types/matches";
import { UserRole } from "@/entities/user/types";
import { getSupervisorOutcomeMatches } from "@/pages_/api/supervisor-matches";
import { InnerHeader } from "@/widgets/header-inner";
import { MatchesHistory } from "@/widgets/matches-history";
import Cookies from "js-cookie";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";

export function SupervisorMatchesHistoryPage() {
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
        const matches = await getSupervisorOutcomeMatches({
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
      <InnerHeader title="Matches History" />
      <MatchesHistory matches={matches} role={UserRole.Supervisor} />
    </>
  );
}
