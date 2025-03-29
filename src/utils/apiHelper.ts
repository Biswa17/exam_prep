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

// Function to submit pending answers from localStorage before logout
export const submitPendingAnswersBeforeLogout = async (): Promise<void> => {
  console.log("Checking for pending answers before logout...");
  const keysToRemove: string[] = [];
  const submissionPromises: Promise<any>[] = [];

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith("selectedAnswers_")) {
      const match = key.match(/^selectedAnswers_(\d+)$/);
      if (match) {
        const topicId = match[1];
        const answersJson = localStorage.getItem(key);
        if (answersJson) {
          try {
            const selectedAnswers = JSON.parse(answersJson);
            const answerEntries = Object.entries(selectedAnswers);

            if (answerEntries.length > 0) {
              console.log(`Found pending answers for topic ${topicId}. Submitting...`);
              const submissionPromise = apiRequest(
                `/api/sf/questions/user-answer`,
                "POST",
                {
                  topic_id: Number(topicId),
                  answers: answerEntries.map(([questionId, option]) => ({
                    question_id: Number(questionId),
                    selected_option: option as string // Assuming option is always string
                  }))
                }
              ).then(response => {
                if (response.status === 'success') {
                  console.log(`Successfully submitted answers for topic ${topicId}.`);
                  // Mark related keys for removal only on successful submission
                  keysToRemove.push(`selectedAnswers_${topicId}`);
                  keysToRemove.push(`isSubmitted_${topicId}`);
                  keysToRemove.push(`pageNumber_${topicId}`);
                } else {
                  console.error(`Failed to submit answers for topic ${topicId}:`, response.message);
                  // Decide if you want to remove keys even on failure, maybe not?
                  // For now, we only remove on success.
                }
              }).catch(error => {
                console.error(`Error submitting answers for topic ${topicId}:`, error);
                // Handle submission error, maybe retry or log?
              });
              submissionPromises.push(submissionPromise);
            } else {
              // If the answers object is empty, mark for removal anyway
              console.log(`No pending answers to submit for topic ${topicId}, marking for cleanup.`);
              keysToRemove.push(`selectedAnswers_${topicId}`);
              keysToRemove.push(`isSubmitted_${topicId}`);
              keysToRemove.push(`pageNumber_${topicId}`);
            }
          } catch (parseError) {
            console.error(`Error parsing answers for topic ${topicId} from localStorage:`, parseError);
            // Mark potentially corrupted key for removal
            keysToRemove.push(key);
            keysToRemove.push(`isSubmitted_${topicId}`);
            keysToRemove.push(`pageNumber_${topicId}`);
          }
        } else {
           // If value is null/empty, mark for removal
           keysToRemove.push(key);
           keysToRemove.push(`isSubmitted_${topicId}`);
           keysToRemove.push(`pageNumber_${topicId}`);
        }
      }
    }
  }

  // Wait for all submission attempts to complete
  try {
    await Promise.allSettled(submissionPromises);
    console.log("Finished attempting all pending answer submissions.");
  } catch (error) {
    console.error("An error occurred while waiting for submissions:", error);
  } finally {
    // Clean up localStorage regardless of submission success/failure
    // Use a Set to ensure unique keys before removing
    const uniqueKeysToRemove = [...new Set(keysToRemove)];
    console.log("Cleaning up localStorage keys:", uniqueKeysToRemove);
    uniqueKeysToRemove.forEach(key => {
      localStorage.removeItem(key);
    });
    console.log("LocalStorage cleanup complete.");
  }
};
