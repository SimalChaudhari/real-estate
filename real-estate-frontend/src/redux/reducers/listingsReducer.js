import { PROPERTY_BY_ID, PROPERTY_CREATE, PROPERTY_LIST } from "../constants/actionsType";

const initialState = {
    loading: false,
    error: null,
    listings: [],
    propertyDetails: null,
};

const listingsReducer = (state = initialState, action) => {
    console.log("Action Dispatched:", action.type); // Log the action type
    
    switch (action.type) {
        case PROPERTY_LIST:
            return {
                ...state,
                listings: action.payload,
            };
        case PROPERTY_BY_ID:
            return {
                ...state,
                propertyDetails: action.payload,
            };
        case PROPERTY_CREATE:
            return {
                ...state,
                listings: [...state.listings, action.payload], // Add the newly created property to the list
            };
        default:
            return state;
    }
};

export default listingsReducer;
