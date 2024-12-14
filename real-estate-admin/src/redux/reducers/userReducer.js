
const initialState = {
    userData: [],
    userByID: ''
};
const userReducer = (state = initialState, { type, payload } = {}) => {
    switch (type) {
        case "USER_LIST":
            return {
                ...state,
                userData: payload,
            };
        case "USER_BY_LIST":
            return {
                ...state,
                userByID: payload,
            };
        default:
            return state;
    }
};
export default userReducer;
