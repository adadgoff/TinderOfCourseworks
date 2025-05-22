import { UserRole } from "@/entities/user/types";
import { BACKEND_API_URL, handleError } from "@/shared/api";

export interface AuthRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
}

export interface RegisterResponse {
  email: string;
}

export async function login({
  role,
  email,
  password,
}: { role: UserRole } & AuthRequest): Promise<LoginResponse> {
  const form = new URLSearchParams();
  form.append("username", email);
  form.append("password", password);

  const response = await fetch(`${BACKEND_API_URL}/login/${role}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: form.toString(),
  });

  if (!response.ok) {
    return handleError(response);
  }

  const data: { access_token: string } = await response.json();
  return { accessToken: data.access_token };
}

export async function register({
  role,
  email,
  password,
}: { role: UserRole } & AuthRequest): Promise<RegisterResponse> {
  const response = await fetch(`${BACKEND_API_URL}/register/${role}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    return handleError(response);
  }

  return response.json();
}
