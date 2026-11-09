// Shared HTTP client for the ShopBoard & BODREN API

const API_BASE = 'https://shopboard-api.vercel.app';

/** Custom error carrying the HTTP status code */
export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

/**
 * Fetch JSON from API_BASE.
 * Throws ApiError on non-2xx responses.
 */
export async function fetchJson<T>(path: string): Promise<T> {
  const url = `${API_BASE}${path}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new ApiError(
      response.status,
      `Request failed: ${response.status.toString()} ${response.statusText}`
    );
  }

  return response.json() as Promise<T>;
}
