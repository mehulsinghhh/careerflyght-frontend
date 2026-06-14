const API_BASE_URL = "https://careerflyght-backend-v2-production.up.railway.app/api";

type RequestOptions = {
  method?: string;
  headers?: Record<string, string>;
  body?: unknown;
  params?: Record<string, string | number | undefined>;
};

export async function apiClient(endpoint: string, options: RequestOptions = {}) {
  // Try to get token from localStorage (client-side)
  const token = typeof window !== "undefined" ? localStorage.getItem("careerflyghtToken") : null;

  const defaultHeaders: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    defaultHeaders["Authorization"] = `Bearer ${token}`;
  }

  // Construct URL with query parameters
  let url = `${API_BASE_URL}${endpoint}`;
  if (options.params) {
    const queryParams = new URLSearchParams();
    Object.entries(options.params).forEach(([key, value]) => {
      if (value !== undefined) {
        queryParams.append(key, String(value));
      }
    });
    const queryString = queryParams.toString();
    if (queryString) {
      url += `?${queryString}`;
    }
  }

  const response = await fetch(url, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  const data = await response.json();

  if (!response.ok) {
    // Handle 401 Unauthorized globally if needed
    if (response.status === 401 && typeof window !== "undefined") {
        // Optional: clear session and redirect
    }
    throw new Error(data.message || "Request failed");
  }

  return data;
}

export default apiClient;
