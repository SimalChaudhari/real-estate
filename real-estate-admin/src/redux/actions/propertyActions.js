// import axios from "axios";
import axiosInstance from "../basic/config/axiosInstance";
import { toast } from "react-toastify";
import { handleApiError } from "../basic/errorHandling/errorhandler";
import API_ROUTES from "../basic/api/routes";
import { PROPERTY_LIST,PROPERTY_BY_LIST } from "../constants/actionsType";

export const propertyList = () => async (dispatch) => {
    try {
        const response = await axiosInstance.get(API_ROUTES.PROPERTIES.LIST);
        dispatch({
            type: PROPERTY_LIST,
            payload: response.data, // Assuming response contains the customers data
        });
        return true;
    } catch (error) {
        return handleApiError(error);
};
}

export const cityStateList = () => async (dispatch) => {
    try {
        const response = await axiosInstance.get(API_ROUTES.LOC.GET_LOC);
        return response.data;
    } catch (error) {
        return handleApiError(error);
};
}

export const propertyByList = (id) => async (dispatch) => {
    try {
        const response = await axiosInstance.get(API_ROUTES.PROPERTIES.GET_ID(id));
        dispatch({
            type: PROPERTY_BY_LIST,
            payload: response.data, // Assuming response contains the customers data
        });
        return true;
    } catch (error) {
        return handleApiError(error);
    }
};

export const createProperty = (data) => async (dispatch) => {
    try {
        const response = await axiosInstance.post(API_ROUTES.PROPERTIES.CREATE, data);
        if (response && response.status >= 200 && response.status < 300) {
            toast.success(response.data.message || "Property Created")
        }
        return true;
    } catch (error) {
        return handleApiError(error);
    };
}

export const editProperty = (id, data) => async (dispatch) => {
    try {
        const response = await axiosInstance.put(API_ROUTES.PROPERTIES.UPDATE(id), data);
        if (response && response.status >= 200 && response.status < 300) {
            toast.success(response.data.message || "Property Updated!!")
        }
        return true
    } catch (error) {
        return handleApiError(error);
    }
};

export const deleteProperty = (id) => async (dispatch) => {
    try {
        const response = await axiosInstance.delete(API_ROUTES.PROPERTIES.DELETE(id));
        // Check if the response is successful
        if (response && response.status >= 200 && response.status < 300) {
            toast.success(response.data.message || "Property Deleted!!")
        }
        return true
    } catch (error) {
        return handleApiError(error);
    } 
};