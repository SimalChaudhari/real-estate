// import axios from "axios";
import axiosInstance from "../basic/config/axiosInstance";
import { toast } from "react-toastify";
import { handleApiError } from "../basic/errorHandling/errorhandler";

// const axiosInstance = axios.create({
//     baseURL: 'https://real-estate-nine-livid.vercel.app/api',
//     headers: {
//         'Content-Type': 'application/json',
//     },
// });

export const userList = () => async (dispatch) => {
    try {
        const response = await axiosInstance.get('/users');
        dispatch({
            type: "USER_LIST",
            payload: response.data?.users, // Assuming response contains the customers data
        });
        return true;
    } catch (error) {
        return handleApiError(error);
};
}

export const userByList = (id) => async (dispatch) => {
    try {
        const response = await axiosInstance.get(`/users/${id}`);
        dispatch({
            type: "USER_BY_LIST",
            payload: response.data?.user, // Assuming response contains the customers data
        });
        return true;
    } catch (error) {
        return handleApiError(error);
    }
};

export const createUser = (userData) => async (dispatch) => {
    try {
        const response = await axiosInstance.post('/auth/register', userData);
        toast.success(response.data.message)
        return true;
    } catch (error) {
        return handleApiError(error);
    };
}

export const editUser = (userId, userData) => async (dispatch) => {
    try {
        const response = await axiosInstance.put(`/users/update/${userId}`, userData);
    } catch (error) {
        return handleApiError(error);
    }
};

export const deleteUser = (userId) => async (dispatch) => {
    try {
        const response = await axiosInstance.delete(`/users/${userId}`);
        // Check if the response is successful
        if (response && response.status >= 200 && response.status < 300) {
            return true; // Indicate successful deletion
        }
    } catch (error) {
        return handleApiError(error);
    } 
};