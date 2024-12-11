import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: [], // Default value for the user
  token: null, // Default value for the token
  isAuthenticated: false, // Default value for authentication
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      console.log('Reducer Payload:', action.payload); // Debugging
      state.user = action.payload.user; // Update user in the state
      state.token = action.payload.token; // Update token in the state
      state.isAuthenticated = true; // Set authenticated to true
    },
    logout: (state) => {
      state.user = [];
      state.token = null;
      state.isAuthenticated = false;
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
  },
});

export const { loginSuccess, logout, updateUser } = authSlice.actions;
export default authSlice.reducer;
