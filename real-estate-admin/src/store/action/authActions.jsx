import { toast } from "sonner";
import axiosInstance from "src/configs/axiosInstance";
import { AUTH_DATA } from "../constants/actionTypes";

export const login = (email, password) => async (dispatch) => {
    try {
        const response = await axiosInstance.post('auth/admin-login', { email, password });
        const token = response?.data?.access_token;
        localStorage.setItem('userData', JSON.stringify({ user: response?.data?.user }));
        localStorage.setItem('token', token); // Store encrypted name and value
        // Dispatch the authentication action
        dispatch({
            type: AUTH_DATA,
            payload: { user: response?.data?.user },
        });
        return true;
    } catch (error) {
        const errorMessage = error?.response?.data?.message || 'An unexpected error occurred. Please try again.';
        toast.error(errorMessage); // Show error toast
    }
    return false; // Return false if login fails
};

export const register = (userData) => async (dispatch) => {
    try {
        const response = await axiosInstance.post('auth/register', userData);
        const token = response?.data?.access_token;
        localStorage.setItem('userData', JSON.stringify({ user: response?.data?.user }));
        localStorage.setItem('token', token); // Store encrypted name and value
        // Dispatch the registration action
        dispatch({
            type: AUTH_DATA,
            payload: { user: response?.data?.user },
        });
        toast.success('Registration successful!'); // Show success toast
        return true;
    } catch (error) {
        const errorMessage = error?.response?.data?.message || 'An unexpected error occurred. Please try again.';
        toast.error(errorMessage); // Show error toast
    }
    return false; // Return false if registration fails
};



export const logout = () => async (dispatch) => {
    try {
        // Clear local storage
        localStorage.removeItem("userData");
        localStorage.removeItem("token");
        dispatch({ type: "LOGOUT" });

        toast.success("Logged out successfully!");
        return true;
    } catch (error) {
        console.error("Error logging out:", error);
        return false;
    }
};





