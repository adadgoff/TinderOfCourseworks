import {
  MatchSt2SvCw,
  MatchStCw2Sv,
  MatchSv2StCw,
  MatchSvCw2St,
} from "@/entities/types/matches";
import { BACKEND_API_URL, handleError } from "@/shared/api";

export async function getSupervisorIncomeMatches({
  supervisorToken,
}: {
  supervisorToken: string;
}): Promise<(MatchStCw2Sv | MatchSt2SvCw)[]> {
  const response = await fetch(`${BACKEND_API_URL}/supervisor/match/incomes`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${supervisorToken}`,
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    return handleError(response);
  }

  return response.json();
}

export async function getSupervisorOutcomeMatches({
  supervisorToken,
}: {
  supervisorToken: string;
}): Promise<(MatchSv2StCw | MatchSvCw2St)[]> {
  const response = await fetch(`${BACKEND_API_URL}/supervisor/match/outcomes`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${supervisorToken}`,
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    return handleError(response);
  }

  return response.json();
}

export async function postMatchSv2StCw({
  match,
  supervisorToken,
}: {
  match: MatchSv2StCw;
  supervisorToken: string;
}): Promise<MatchSv2StCw> {
  const response = await fetch(`${BACKEND_API_URL}/supervisor/match/sv2stcw`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${supervisorToken}`,
      Accept: "application/json",
    },
    body: JSON.stringify(match),
  });

  if (!response.ok) {
    return handleError(response);
  }

  return response.json();
}

export async function postMatchSvCw2St({
  match,
  supervisorToken,
}: {
  match: MatchSvCw2St;
  supervisorToken: string;
}): Promise<MatchSvCw2St> {
  const response = await fetch(`${BACKEND_API_URL}/supervisor/match/svcw2st`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${supervisorToken}`,
      Accept: "application/json",
    },
    body: JSON.stringify(match),
  });

  if (!response.ok) {
    return handleError(response);
  }

  return response.json();
}
