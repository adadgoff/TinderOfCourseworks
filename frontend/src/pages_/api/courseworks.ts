import { Coursework } from "@/entities/types/coursework";
import { UserRole } from "@/entities/user/types";
import { BACKEND_API_URL, handleError } from "@/shared/api";
import { UUID } from "@/shared/types";

export async function getPersonalCourseworks({
  role,
  token,
}: {
  role: UserRole;
  token: string;
}): Promise<Coursework[]> {
  const response = await fetch(
    `${BACKEND_API_URL}/${role}/coursework/personal`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    },
  );

  if (!response.ok) {
    return handleError(response);
  }

  return response.json();
}

export async function getRoleCoursework({
  courseworkId,
  role,
}: {
  courseworkId: UUID;
  role: UserRole;
}): Promise<Coursework> {
  const response = await fetch(
    `${BACKEND_API_URL}/${role}/coursework/${courseworkId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    },
  );

  if (!response.ok) {
    return handleError(response);
  }

  return response.json();
}

export async function createCoursework({
  coursework,
  role,
  token,
}: {
  coursework: Coursework;
  role: UserRole;
  token: string;
}): Promise<Coursework> {
  const response = await fetch(`${BACKEND_API_URL}/${role}/coursework/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
    body: JSON.stringify(coursework),
  });

  if (!response.ok) {
    return handleError(response);
  }

  return response.json();
}

export async function editCoursework({
  coursework,
  role,
  token,
}: {
  coursework: Coursework;
  role: UserRole;
  token: string;
}): Promise<Coursework> {
  const response = await fetch(`${BACKEND_API_URL}/${role}/coursework/edit`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
    body: JSON.stringify(coursework),
  });

  if (!response.ok) {
    return handleError(response);
  }

  return response.json();
}
