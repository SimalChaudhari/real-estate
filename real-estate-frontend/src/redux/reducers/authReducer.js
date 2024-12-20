import Cookies from "js-cookie";
import { AUTH_DATA, LOGOUT } from "../constants/actionsType";

const initialState = {
  authUser: null, // Default value for the user
  token: null,    // Default value for the token
  authenticated: false, // Default value for authentication
};

const authReducer = (state = initialState, { type, payload } = {}) => {
  switch (type) {
    case AUTH_DATA:
      return {
        ...state,
        authenticated: payload.authenticated, // Update authenticated state
        authUser: payload.authUser,           // Update user data
        token: payload.token,                 // Update token
      };

    case LOGOUT:
      // Clear cookies and reset state
      return {
        ...state,
        authenticated: false,
        authUser: null,
        token: null,
      };

    default:
      return state;
  }
};

export default authReducer;
