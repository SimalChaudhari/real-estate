
import axiosInstance from '@/config/axiosInstance';
import { toast } from 'react-toastify'; // Adjust the path if needed

export const authRegister = async (contact) => {
    try {
        const response = await axiosInstance.post('/api/auth/register', contact);

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
        const response = await axiosInstance.post('/api/auth/login', data);
        // Validate response structure
        const token = response?.data?.access_token;
        const user = response?.data?.user;
        localStorage.setItem('user', JSON.stringify({ user:user }));
        localStorage.setItem('token', token); // Store encrypted name and value
        // Dispatch the authentication action
        dispatch({
            type: "AUTH_DATA",
            payload: { user: user },
        });

    } catch (error) {
        const errorMessage = error?.response?.data?.message || error.message || 'An error occurred during login';
        toast.error(errorMessage, "Login Failed. Please Try Again.");
        console.error('Error during login:', errorMessage);
        throw new Error(errorMessage); // Throwing meaningful error
    }
};
