import { RecSt, RecStCw, RecSv, RecSvCw } from "@/entities/types/recsys";
import { BACKEND_API_URL, handleError } from "@/shared/api";
import { UUID } from "@/shared/types";

export async function recommendSt({
  svCwId,
  supervisorToken,
}: {
  svCwId: UUID;
  supervisorToken: string;
}): Promise<RecSt | null> {
  const response = await fetch(
    `${BACKEND_API_URL}/recsys/st2svcw?sv_cw_id=${svCwId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${supervisorToken}`,
        Accept: "application/json",
      },
    },
  );

  if (!response.ok) {
    return handleError(response);
  }

  return response.json();
}

export async function recommendStCw({
  supervisorToken,
}: {
  supervisorToken: string;
}): Promise<RecStCw | null> {
  const response = await fetch(`${BACKEND_API_URL}/recsys/stcw2sv`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${supervisorToken}`,
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    return handleError(response);
  }

  return response.json();
}

export async function recommendSv({
  stCwId,
  studentToken,
}: {
  stCwId: UUID;
  studentToken: string;
}): Promise<RecSv | null> {
  const response = await fetch(
    `${BACKEND_API_URL}/recsys/sv2stcw?st_cw_id=${stCwId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${studentToken}`,
        Accept: "application/json",
      },
    },
  );

  if (!response.ok) {
    return handleError(response);
  }

  return response.json();
}

export async function recommendSvCw({
  studentToken,
}: {
  studentToken: string;
}): Promise<RecSvCw | null> {
  const response = await fetch(`${BACKEND_API_URL}/recsys/svcw2st`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${studentToken}`,
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    return handleError(response);
  }

  return response.json();
}
