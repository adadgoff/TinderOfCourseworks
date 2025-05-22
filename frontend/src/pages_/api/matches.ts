import { ApproveSt2SvCw, ApproveSv2StCw } from "@/entities/types/matches";
import { UserRole } from "@/entities/user/types";
import { BACKEND_API_URL, handleError } from "@/shared/api";

export async function getRoleApproves({
  role,
  token,
}: {
  role: UserRole;
  token: string;
}): Promise<(ApproveSt2SvCw | ApproveSv2StCw)[]> {
  const response = await fetch(`${BACKEND_API_URL}/${role}/match/approves`, {
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
