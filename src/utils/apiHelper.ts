interface ApiResponse<T> {
  status: "success" | "error";
  response?: T;
  message?: string;
}

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const apiRequest = async <T>(
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  body?: object,
  customHeaders: Record<string, string> = {}
): Promise<ApiResponse<T>> => {
  try {
    // Retrieve the access token from localStorage
    const token = localStorage.getItem("access_token");

    // Set default headers
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...customHeaders, // Allow passing extra headers
    };

    // If token exists, add Authorization header
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data: ApiResponse<T> = await response.json();
    return data;
  } catch (error) {
    console.error("API Request Error:", error);
    return {
      status: "error",
      message: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
};
