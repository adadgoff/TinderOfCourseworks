import { User } from "@/entities/types/user";
import { UserRole } from "@/entities/user/types";
import { BACKEND_API_URL, handleError } from "@/shared/api";
import { UUID } from "@/shared/types";

export async function getPersonalRoleUser({
  role,
  token,
}: {
  role: UserRole;
  token: string;
}): Promise<User> {
  const response = await fetch(`${BACKEND_API_URL}/${role}/personal`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    return handleError(response);
  }

  return response.json();
}

export async function getRoleUser({
  role,
  userId,
}: {
  role: UserRole;
  userId: UUID;
}): Promise<User> {
  const response = await fetch(`${BACKEND_API_URL}/${role}/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    return handleError(response);
  }

  return response.json();
}

export async function editRoleUser({
  role,
  token,
  user,
}: {
  role: UserRole;
  token: string;
  user: User;
}): Promise<User> {
  const response = await fetch(`${BACKEND_API_URL}/${role}/edit`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    return handleError(response);
  }

  return response.json();
}
