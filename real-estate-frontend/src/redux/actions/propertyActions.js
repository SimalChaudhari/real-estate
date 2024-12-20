import axiosInstance from "../basic/config/axiosInstance";
import { toast } from "react-toastify";
import { handleApiError } from "../basic/errorHandling/errorhandler";
import API_ROUTES from "../basic/api/routes";
import { PROPERTY_LIST, PROPERTY_BY_ID } from "../constants/actionsType";

export const propertyList = () => async (dispatch) => {
    try {
        const response = await axiosInstance.get(API_ROUTES.PROPERTIES.LIST);
        dispatch({
            type: PROPERTY_LIST,
            payload: response.data,
        });
        return true;
    } catch (error) {
        return handleApiError(error);
    }
};

export const propertyById = (id) => async (dispatch) => {
    try {
        const response = await axiosInstance.get(API_ROUTES.PROPERTIES.GET_BY_ID(id));
        dispatch({
            type: PROPERTY_BY_ID,
            payload: response.data?.property,
        });
        return true;
    } catch (error) {
        return handleApiError(error);
    }
};

export const createProperty = (propertyData) => async (dispatch) => {
    try {
        const response = await axiosInstance.post(API_ROUTES.PROPERTIES.CREATE, propertyData);

        if (response && response.status >= 200 && response.status < 300) {
            toast.success(response.data.message || "Property created successfully!");

            dispatch({
                type: PROPERTY_CREATE,
                payload: response.data.property,
            });

            return true;
        }
    } catch (error) {
        return handleApiError(error);
    }
};