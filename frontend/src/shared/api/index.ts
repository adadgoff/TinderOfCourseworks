const BACKEND_HOST = process.env.BACKEND_HOST;
const NEXT_PUBLIC_BACKEND_HOST = process.env.NEXT_PUBLIC_BACKEND_HOST;

// export const BACKEND_API_URL = `${BACKEND_HOST}/api`;

export const BACKEND_API_URL = `${NEXT_PUBLIC_BACKEND_HOST}/api`;

export interface HTTPException {
  detail: string;
}

export async function handleError(response: Response): Promise<never> {
  const error: HTTPException = await response.json();
  alert(error.detail);
  throw new Error(error.detail || "Unknown error");
}
