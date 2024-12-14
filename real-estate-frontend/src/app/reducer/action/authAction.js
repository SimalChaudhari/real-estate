
import axiosInstance from "@/config/axiosInstance";
import { toast } from "react-toastify";
import { loginSuccess } from "../fratures/authSlice";

export const authLogin = (loginCredentials) => async (dispatch) => {
    try {
        const response = await axiosInstance.post("/api/auth/login", loginCredentials);

        // Validate response structure
        const token = response?.data?.access_token;
        const user = response?.data?.user;

        if (!token || !user) {
            throw new Error("Invalid response structure from the server");
        }
        toast.success("Login Successfull!");

        // Dispatch Redux action to update the auth state
        dispatch(loginSuccess({ user, token }));

        return {
            success: true,
            user,
            token,
            message: response?.data?.message || "Login successful!",
        };
    } catch (error) {
        const errorMessage = error?.response?.data?.message || error.message || "An error occurred during login";
        toast.error(errorMessage, "Login Failed. Please Try Again.");
        console.error("Error during login:", errorMessage);

        return {
            success: false,
            message: errorMessage,
        };
    }
};


export const authRegister = async (contact) => {
    try {
        const response = await axiosInstance.post("/api/auth/register", contact);

        if (!response?.data?.success) {
            toast.error(response?.data?.message || "Registration failed.");
            throw new Error(response?.data?.message || "Registration failed.");
        }


        // Validate response structure
        const token = response?.data?.access_token;
        const user = response?.data?.user;

        if (!token || !user) {
            throw new Error("Invalid response structure from the server");
        }

        // Dispatch Redux action to update the auth state
        dispatch(loginSuccess({ user, token }));

        toast.success("Registration Successful!");

        return {
            success: true,
            message: response.data.message || "Registration successful!",
        };
    } catch (error) {
        const errorMessage = error?.response?.data?.message || error.message || "An error occurred during registration";
        console.error("Error during registration:", errorMessage);

        return {
            success: false,
            message: errorMessage,
        };
    }
};