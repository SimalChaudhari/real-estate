// import axios from "axios";
import axiosInstance from "../basic/config/axiosInstance";
import { toast } from "react-toastify";
import { handleApiError } from "../basic/errorHandling/errorhandler";
import API_ROUTES from "../basic/api/routes";
import { USER_BY_LIST, USER_LIST } from "../constants/actionsType";

export const userList = () => async (dispatch) => {
    try {
        const response = await axiosInstance.get(API_ROUTES.USERS.GET);
        dispatch({
            type: USER_LIST,
            payload: response.data?.users, // Assuming response contains the customers data
        });
        return true;
    } catch (error) {
        return handleApiError(error);
};
}

export const userByList = (id) => async (dispatch) => {
    try {
        const response = await axiosInstance.get(API_ROUTES.USERS.GET_ID(id));
        dispatch({
            type: USER_BY_LIST,
            payload: response.data?.user, // Assuming response contains the customers data
        });
        return true;
    } catch (error) {
        return handleApiError(error);
    }
};

export const createUser = (userData) => async (dispatch) => {
    try {
        const response = await axiosInstance.post(API_ROUTES.AUTH.REGISTER, userData);
        if (response && response.status >= 200 && response.status < 300) {
            toast.success(response.data.message || "User Created")
        }
        return true;
    } catch (error) {
        return handleApiError(error);
    };
}

export const editUser = (id, data) => async (dispatch) => {
    try {
        const response = await axiosInstance.put(API_ROUTES.USERS.UPDATE(id), data);
        if (response && response.status >= 200 && response.status < 300) {
            toast.success(response.data.message || "User Updated!!")
        }
        return true
    } catch (error) {
        return handleApiError(error);
    }
};

export const deleteUser = (id) => async (dispatch) => {
    try {
        const response = await axiosInstance.delete(API_ROUTES.USERS.DELETE(id));
        // Check if the response is successful
        if (response && response.status >= 200 && response.status < 300) {
            toast.success(response.data.message || "User Deleted!!")
        }
        return true
    } catch (error) {
        return handleApiError(error);
    } 
};