import { CITIES_LIST } from "../constants/actionsType";

const initialState = {
    location: [],
    loading: false,
    error: null,
};

const locationsReducer = (state = initialState, action) => {
    console.log("Reducer Payload ============>:", action); // Debugging log

    switch (action.type) {
        case CITIES_LIST:
            console.log("Reducer Payload ============>:", action.payload); // Debugging log
            return {
                ...state,
                location: action.payload || [], // Safely handle null or undefined
                loading: false,
                error: null, // Clear errors
            };
        default:
            return state;
    }
};

export default locationsReducer;
