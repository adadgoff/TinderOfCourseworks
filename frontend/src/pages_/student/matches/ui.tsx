"use client";

import {
  MatchSt2SvCw,
  MatchStCw2Sv,
  MatchSv2StCw,
  MatchSvCw2St,
} from "@/entities/types/matches";
import { UserRole } from "@/entities/user/types";
import { InnerHeader } from "@/widgets/header-inner";
import { Matches } from "@/widgets/matches";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { notFound } from "next/navigation";
import { getStudentIncomeMatches } from "@/pages_/api/student-matches";

export function StudentMatchesPage() {
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
        const matches = await getStudentIncomeMatches({
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
      <InnerHeader
        buttonDecor="grey"
        buttonText="history"
        href="/student/matches/history"
        iconName="common/history"
        openInNewTab={true}
        title="Matches"
      />
      <Matches matches={matches} role={UserRole.Student} token={studentToken} />
    </>
  );
}
