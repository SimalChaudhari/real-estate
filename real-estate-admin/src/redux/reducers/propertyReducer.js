import { PROPERTY_LIST, PROPERTY_BY_LIST } from "../constants/actionsType";

const initialState = {
    propertyData: [],
    propertyByID: ''
};
const propertyReducer = (state = initialState, { type, payload } = {}) => {
    switch (type) {
        case PROPERTY_LIST:
            return {
                ...state,
                propertyData: payload,
            };
        case PROPERTY_BY_LIST:
            return {
                ...state,
                propertyByID: payload,
            };
        default:
            return state;
    }
};
export default propertyReducer;
