import Cookies from "js-cookie";
import { toast } from 'react-toastify'; // Adjust the path if needed
import axiosInstance from './../../config/axiosInstance';

export const authRegister = async (contact) => {
    try {
        const response = await axiosInstance.post('/auth/register', contact);

        if (!response?.data?.success) {
            toast.error(response?.data?.message, "Registration failed.");
            throw new Error(response?.data?.message || 'Registration failed.');
        }
        toast.success("Registration Successfull!");

        return {
            success: true,
            message: response.data.message || 'Registration successful!',
        };
    } catch (error) {
        const errorMessage = error?.response?.data?.message || error.message || 'An error occurred during registration';
        console.error('Error during registration:', errorMessage);
        throw new Error(errorMessage); // Throwing meaningful error
    }
};

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
        throw new Error("Invalid login response");
      }
      return true
    } catch (error) {
      const errorMessage = error?.response?.data?.message || error.message || "An error occurred during login";
      toast.error(errorMessage, "Login Failed. Please Try Again.");
      console.error("Error during login:", errorMessage);
      throw new Error(errorMessage); // Throwing meaningful error
    }
  };