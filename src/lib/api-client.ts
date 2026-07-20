const API_BASE_URL =
  "https://careerflyght-backend-v2.onrender.com/api";

type RequestOptions = {
  method?: string;
  headers?: Record<string, string>;
  body?: unknown;
};

export class ApiError extends Error {
  status: number;
  data: any;

  constructor(message: string, status: number, data: any) {
    super(message);
    this.status = status;
    this.data = data;
    this.name = "ApiError";
  }
}

export function getAuthKeys() {
  if (typeof window === "undefined") return { tokenKey: "platformToken", userKey: "platformUser" };

  const isAdminPath = window.location.pathname.startsWith("/admin");
  return {
    tokenKey: isAdminPath ? "adminToken" : "platformToken",
    userKey: isAdminPath ? "adminUser" : "platformUser"
  };
}

export async function apiClient(endpoint: string, options: RequestOptions = {}) {
  const { tokenKey } = getAuthKeys();
  const token = typeof window !== "undefined" ? localStorage.getItem(tokenKey) : null;

  const defaultHeaders: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    defaultHeaders["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new ApiError(data.message || "Request failed", response.status, data);
  }

  return data;
}

export default apiClient;
