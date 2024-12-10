import { toast } from "sonner";
import axiosInstance from "src/configs/axiosInstance";
import { PROPERTY_GET_BY_LIST, PROPERTY_LIST } from "../constants/actionTypes";

export const propertyList = () => async (dispatch) => {
    try {
        const response = await axiosInstance.get('/properties');
        dispatch({
            type: PROPERTY_LIST,
            payload: response.data, // Assuming response contains the customers data
        });
        return true;
    } catch (error) {
        // Check if error response exists and handle error message
        const errorMessage = error?.response?.data?.message || 'An unexpected error occurred. Please try again.';
        toast.error(errorMessage);
    }
    return false; // Return false for any errors
};



export const getByProperty = (id) => async (dispatch) => {
    try {
        const response = await axiosInstance.get(`/properties/${id}`);
  
        dispatch({
            type: PROPERTY_GET_BY_LIST,
            payload: response.data, // Assuming response contains the customers data
        });
        return true;
    } catch (error) {
        // Check if error response exists and handle error message
        const errorMessage = error?.response?.data?.message || 'An unexpected error occurred. Please try again.';
        toast.error(errorMessage);
    }
    return false; // Return false for any errors
};


export const createProperty = (data) => async (dispatch) => {
    try {
        const response = await axiosInstance.post('/properties', data);
        if (response && response.status >= 200 && response.status < 300) {
            toast.success(response.data.message || 'Properties registered successfully!');
            return true;
        }
        return true;
    } catch (error) {
        // Check if error response exists and handle error message
        const errorMessage = error?.response?.data?.message || 'An unexpected error occurred. Please try again.';
        toast.error(errorMessage);
    }
    return false; // Return false for any errors
};

export const editProperty = (Id, Data) => async (dispatch) => {
    try {
        const response = await axiosInstance.post(`/properties/${Id}`, Data);    // Check if the response is successful
        if (response && response.status >= 200 && response.status < 300) {
            toast.success(response.data.message || 'Properties updated successfully!');
            return true; // Indicate successful update
        }
    } catch (error) {
        // Handle errors appropriately
        const errorMessage = error?.response?.data?.message || 'An unexpected error occurred. Please try again.';
        toast.error(errorMessage);
    }
    return false; // Return false for any errors or unsuccessful attempts
};



export const deleteProperty = (id) => async (dispatch) => {
    try {
        await axiosInstance.delete(`/properties/${id}`);
        return true;
    } catch (error) {
        // Check if error response exists and handle error message
        const errorMessage = error?.response?.data?.message || 'An unexpected error occurred. Please try again.';
        toast.error(errorMessage);
    }
    return false; // Return false for any errors
};


