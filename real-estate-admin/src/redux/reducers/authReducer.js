
const initialState = {
  authenticated: "", // Check token presence
  authUser: "", // Use user data consistently
  loading: false
};

const authReducer = (state = initialState, { type, payload } = {}) => {
  switch (type) {
    case "AUTH_DATA":
      return {
        ...state,
        authenticated: true,
        authUser: payload.user, // Ensure consistency with user structure
      };

    case "LOGOUT":
      return {
        authenticated: false,
        authUser: '',
      };


    default:
      return state;
  }
};

export default authReducer;
