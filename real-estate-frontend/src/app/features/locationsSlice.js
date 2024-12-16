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
    fetchLocationsSuccess: (state, action) => {
        // console.log('Reducer Payload:', action.payload);
      state.loading = false;
      state.location = action.payload;
    },
    fetchLocationFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchLocationsStart,
  fetchLocationsSuccess,
  fetchLocationFailure,
} = locationsSlice.actions;

export default locationsSlice.reducer;
