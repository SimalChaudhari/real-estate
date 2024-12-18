import Cookies from "js-cookie";
import { toast } from 'react-toastify'; // Adjust the path if needed
import axiosInstance from "../basic/config/axiosInstance";
import { handleApiError } from "../basic/errorHandling/errorhandler";

export const authLogin = (data) => async (dispatch) => {
  try {
    const response = await axiosInstance.post("/auth/login", data);
    // Validate response structure
    const token = response?.data?.access_token;
    const user = response?.data?.user;
    if (token && user) {
      // Store token and user in cookies
      Cookies.set("token", token, { path: "/", secure: true, sameSite: "Strict", httpOnly: false });
      Cookies.set("user", JSON.stringify(user), { path: "/", secure: true, sameSite: "Strict", httpOnly: false });

    } else {
      toast.error("Invalid login response");
    }
    if (response && response.status >= 200 && response.status < 300) {
      toast.success(response.data.message || "User Created")
    }
    return true
  } catch (error) {
    return handleApiError(error);
  };
}
