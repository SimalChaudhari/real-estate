import axiosInstance from "../basic/config/axiosInstance";
import { toast } from "react-toastify";
import { handleApiError } from "../basic/errorHandling/errorhandler";
import API_ROUTES from "../basic/api/routes";
import { CITIES_LIST } from "../constants/actionsType";

export const citiesList = () => async (dispatch) => {
    try {
        const response = await axiosInstance.get(API_ROUTES.CITIES.GET);
        console.log("response :", response.data.cities);
        
        dispatch({
            type: CITIES_LIST,
            payload: response.data.cities,
        });
        return true;
    } catch (error) {
        return handleApiError(error);
    }
};
