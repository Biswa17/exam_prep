// Define a more specific type for the expected API response structure, including status_code
interface ApiResponse<T> {
  status: "success" | "error";
  status_code?: number; // Make status_code optional as it might not always be present
  message?: string;
  response?: T; // Keep response optional
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

    // Check response status code directly first
    if (response.status === 401) {
      console.error("API Request Error: Unauthorized (401)");
      localStorage.removeItem("access_token"); // Remove token
      // Use replace to avoid adding to browser history, making back button behavior more intuitive
      window.location.replace('/login'); // Redirect to login
      // Return a specific error structure to stop further processing in the calling code
      return {
        status: "error",
        message: "Your token has expired or is invalid. Please log in again.",
        status_code: 401,
      } as ApiResponse<T>; // Cast to ensure type compatibility
    }

    // Handle other non-OK HTTP statuses before attempting to parse JSON
    if (!response.ok) {
      let errorMessage = `HTTP error! Status: ${response.status}`;
      try {
        // Attempt to parse a JSON error body for a more specific message
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch (parseError) {
        // Ignore error if response body isn't valid JSON or is empty
        console.warn("Could not parse error response body:", parseError);
      }
      // Throw an error to be caught by the catch block below
      throw new Error(errorMessage);
    }

    // If response is OK (e.g., 200), parse the JSON body
    const data: ApiResponse<T> = await response.json();

    // Even with a 200 OK, the API might indicate an error in the body (like a logical 401)
    // Check if the parsed data indicates a 401 error specifically
    if (data.status === "error" && data.status_code === 401) {
        console.error("API Logic Error: Unauthorized (401 status_code in response body)");
        localStorage.removeItem("access_token"); // Remove token
        window.location.replace('/login'); // Redirect to login using replace
        // Return the error data received from the API, as it might contain useful info
        return data;
    }

    // If no errors were detected, return the successful data
    return data;
  } catch (error) {
    // Log the error that occurred during fetch or processing
    console.error("API Request Error caught:", error);

    // Return a generic error structure for unexpected errors
    return {
      status: "error",
      message: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
};
