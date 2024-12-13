import Cookies from "js-cookie";

const initialState = {
    authenticated: !!Cookies.get("token"), // Check token presence in cookies
    authUser: Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null, // Load user from cookies
};

const authReducer = (state = initialState, { type, payload } = {}) => {
    switch (type) {
        case "AUTH_DATA":
            return {
                ...state,
                authenticated: payload.authenticated, // Update authenticated state
                authUser: payload.authUser,           // Update user data
            };

        case "LOGOUT":
            // Clear cookies and reset state
            Cookies.remove("token");
            Cookies.remove("user");
            return {
                authenticated: false,
                authUser: null,
            };

        default:
            return state;
    }
};

export default authReducer;
