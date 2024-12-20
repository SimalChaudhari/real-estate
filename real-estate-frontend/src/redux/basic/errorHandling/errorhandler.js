import { toast } from "react-toastify";

export const handleApiError = (error) => {

  if (error.response) {
    const { status, data } = error.response;

    if (status === 400 && data.message) {
      toast.error(data.message);
    } else if (status === 500) {
      toast.error("An internal server error occurred. Please try again later.");
    } else {
      toast.error(data.message || "Something went wrong. Please try again.");
    }
  } else if (error.request) {
    // Handle network-related errors
    toast.error("Network error: Unable to reach the server. Please check your connection.");
  } else {
    // Handle unexpected errors
    toast.error("An unexpected error occurred. Please try again.");
  }

  return false; // Return false for errors
};
