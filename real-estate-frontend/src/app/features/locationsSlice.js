import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  location: [],
  loading: false,
  error: null,
};

const locationsSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    fetchLocationsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchLocationsSuccess(state, action) {
      state.loading = false;
      state.location = action.payload || []; // Ensure payload is always an array
    },
    fetchLocationFailure(state, action) {
      state.loading = false;
      state.error = action.payload || 'An error occurred'; // Provide a default error message
    },
  },
});

export const {
  fetchLocationsStart,
  fetchLocationsSuccess,
  fetchLocationFailure,
} = locationsSlice.actions;

export default locationsSlice.reducer;
