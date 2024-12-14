import axiosInstance from '@/config/axiosInstance';

import { toast } from 'react-toastify'; // Adjust the path if needed

// import { USER_LIST } from "../constants/actionTypes";

export const userList = () => async (dispatch) => {
    try {
        const response = await axiosInstance.get('/users');
        dispatch({
            type: "USER_LIST",
            payload: response.data?.users, // Assuming response contains the customers data
        });
        return true;
    } catch (error) {
        // Check if error response exists and handle error message
        const errorMessage = error?.response?.data?.message || 'An unexpected error occurred. Please try again.';
    }
    return false; // Return false for any errors
};

export const userByList = (id) => async (dispatch) => {
    try {
        const response = await axiosInstance.get(`/users/${id}`);
        console.log("🚀 ~ userByList ~ response:", response)

        dispatch({
            type: "USER_BY_LIST",
            payload: response.data?.user, // Assuming response contains the customers data
        });
        return true;
    } catch (error) {
        // Check if error response exists and handle error message
        const errorMessage = error?.response?.data?.message || 'An unexpected error occurred. Please try again.';
    }
    return false; // Return false for any errors
};

export const createUser = (userData) => async (dispatch) => {
    try {
        const response = await axiosInstance.post('/auth/register', userData);
        if (response && response.status >= 200 && response.status < 300) {

            return true;
        }
        return true;
    } catch (error) {
        // Check if error response exists and handle error message
        const errorMessage = error?.response?.data?.message || 'An unexpected error occurred. Please try again.';

    }
    return false; // Return false for any errors
};

export const editUser = (userId, userData) => async (dispatch) => {
    try {
        const response = await axiosInstance.put(`/users/update/${userId}`, userData);

        console.log("🚀 ~ editUser ~ response:", response)
        // Check if the response is successful
        if (response && response.status >= 200 && response.status < 300) {

            return true; // Indicate successful update
        }
    } catch (error) {
        // Handle errors appropriately
        const errorMessage = error?.response?.data?.message || 'An unexpected error occurred. Please try again.';

    }
    return false; // Return false for any errors or unsuccessful attempts
};

export const deleteUser = (userId) => async (dispatch) => {
    try {
        const response = await axiosInstance.delete(`/users/${userId}`);
        // Check if the response is successful
        if (response && response.status >= 200 && response.status < 300) {

            return true; // Indicate successful deletion
        }
    } catch (error) {
        // Handle errors appropriately
        const errorMessage = error?.response?.data?.message || 'An unexpected error occurred. Please try again.';
    }
    return false; // Return false for any errors or unsuccessful attempts
};