import { CITIES_LIST } from "../constants/actionsType";


const initialState = {
    location: [],
    loading: false,
    error: null,
  };

const locationsReducer = (state = initialState, action) => {
    console.log("Action Dispatched:", action.type); // Log the action type
    
    switch (action.type) {
        case CITIES_LIST:
            return {
                ...state,
                location: action.payload,
            };
        default:
            return state;
    }
};

export default locationsReducer;
