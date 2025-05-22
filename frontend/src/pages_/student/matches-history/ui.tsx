"use client";

import {
  MatchSt2SvCw,
  MatchStCw2Sv,
  MatchSv2StCw,
  MatchSvCw2St,
} from "@/entities/types/matches";
import { UserRole } from "@/entities/user/types";
import { getStudentOutcomeMatches } from "@/pages_/api/student-matches";
import { InnerHeader } from "@/widgets/header-inner";
import { MatchesHistory } from "@/widgets/matches-history";
import Cookies from "js-cookie";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";

export function StudentMatchesHistoryPage() {
  const studentToken = Cookies.get("studentToken");
  const [matches, setMatches] = useState<
    (MatchSt2SvCw | MatchStCw2Sv | MatchSv2StCw | MatchSvCw2St)[]
  >([]);

  if (studentToken === undefined) {
    return notFound();
  }

  useEffect(
    function () {
      const fetchMatches = async function () {
        const matches = await getStudentOutcomeMatches({
          studentToken: studentToken,
        });
        setMatches(matches);
      };

      fetchMatches();
    },
    [studentToken],
  );

  return (
    <>
      <InnerHeader title="Matches History" />
      <MatchesHistory matches={matches} role={UserRole.Student} />
    </>
  );
}
