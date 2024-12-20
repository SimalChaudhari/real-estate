import Cookies from "js-cookie";
import { toast } from "react-toastify"; // Adjust the path if needed
import axiosInstance from "../basic/config/axiosInstance";
import { handleApiError } from "../basic/errorHandling/errorhandler";
import { AUTH_DATA, LOGOUT } from "../constants/actionsType";

// Login action
export const authLogin = (data) => async (dispatch) => {
  try {
    const response = await axiosInstance.post("/auth/login", data);
    const token = response?.data?.access_token;
    const user = response?.data?.user;

    if (token && user) {
      // Store token and user in cookies
      Cookies.set("token", token, {
        path: "/",
        secure: true,
        sameSite: "Strict",
        httpOnly: false,
      });
      Cookies.set("user", JSON.stringify(user), {
        path: "/",
        secure: true,
        sameSite: "Strict",
        httpOnly: false,
      });

      // Dispatch action to update state
      dispatch({
        type: AUTH_DATA,
        payload: {
          authenticated: true,
          authUser: user,
          token,
        },
      });

      toast.success(response.data.message || "Login successful!");
      return true;
    } else {
      toast.error("Invalid login response");
    }
  } catch (error) {
    return handleApiError(error);
  }
};

// Logout action
export const authLogout = () => (dispatch) => {
  try {
    // Remove cookies
    Cookies.remove("token");
    Cookies.remove("user");

    // Dispatch action to reset auth state
    dispatch({
      type: LOGOUT,
    });

    toast.success("Successfully logged out!");
    return true;
  } catch (error) {
    toast.error("Error during logout!");
    return false;
  }
};
