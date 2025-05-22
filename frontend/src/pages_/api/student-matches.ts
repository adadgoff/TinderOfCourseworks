import {
  MatchSt2SvCw,
  MatchStCw2Sv,
  MatchSv2StCw,
  MatchSvCw2St,
} from "@/entities/types/matches";
import { BACKEND_API_URL, handleError } from "@/shared/api";

export async function getStudentIncomeMatches({
  studentToken,
}: {
  studentToken: string;
}): Promise<(MatchSvCw2St | MatchSv2StCw)[]> {
  const response = await fetch(`${BACKEND_API_URL}/student/match/incomes`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${studentToken}`,
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    return handleError(response);
  }

  return response.json();
}

export async function getStudentOutcomeMatches({
  studentToken,
}: {
  studentToken: string;
}): Promise<(MatchSt2SvCw | MatchStCw2Sv)[]> {
  const response = await fetch(`${BACKEND_API_URL}/student/match/outcomes`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${studentToken}`,
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    return handleError(response);
  }

  return response.json();
}

export async function postMatchSt2SvCw({
  match,
  studentToken,
}: {
  match: MatchSt2SvCw;
  studentToken: string;
}): Promise<MatchSt2SvCw> {
  const response = await fetch(`${BACKEND_API_URL}/student/match/st2svcw`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${studentToken}`,
      Accept: "application/json",
    },
    body: JSON.stringify(match),
  });

  if (!response.ok) {
    return handleError(response);
  }

  return response.json();
}

export async function postMatchStCw2Sv({
  match,
  studentToken,
}: {
  match: MatchStCw2Sv;
  studentToken: string;
}): Promise<MatchStCw2Sv> {
  const response = await fetch(`${BACKEND_API_URL}/student/match/stcw2sv`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${studentToken}`,
      Accept: "application/json",
    },
    body: JSON.stringify(match),
  });

  if (!response.ok) {
    return handleError(response);
  }

  return response.json();
}
