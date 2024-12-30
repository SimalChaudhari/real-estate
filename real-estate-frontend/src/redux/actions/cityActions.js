import axiosInstance from "../basic/config/axiosInstance";
import { toast } from "react-toastify";
import { handleApiError } from "../basic/errorHandling/errorhandler";
import API_ROUTES from "../basic/api/routes";
import { CITIES_LIST } from "../constants/actionsType";

export const citiesList = () => async (dispatch) => {
    try {
        const response = await axiosInstance.get(API_ROUTES.CITIES.GET);
        console.log("API Response:", response);

        if (response.data && response.data[0]?.cities?.length > 0) {
            dispatch({
                type: CITIES_LIST,
                payload: response.data[0]?.cities,
            });
            console.log("Dispatching Action:", {
                type: CITIES_LIST,
                payload: response.data[0]?.cities,
            });
        } else {
            toast.error("No cities found.");
            dispatch({
                type: CITIES_LIST,
                payload: [],
            });
        }
    } catch (error) {
        handleApiError(error);
        toast.error("Failed to fetch cities.");
        dispatch({
            type: CITIES_LIST,
            payload: [],
        });
    }
};
