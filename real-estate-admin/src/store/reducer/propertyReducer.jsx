import { PROPERTY_LIST, PROPERTY_GET_BY_LIST } from "../constants/actionTypes";

const initialState = {
    property: [],
    getByProperty: ""
};
const propertyReducer = (state = initialState, { type, payload } = {}) => {
    switch (type) {
        case PROPERTY_LIST:
            return {
                ...state,
                property: payload,
            };
        case PROPERTY_GET_BY_LIST:
            return {
                ...state,
                getByProperty: payload,
            };
        default:
            return state;
    }
};
export default propertyReducer;
