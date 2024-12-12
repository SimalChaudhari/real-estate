import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  listings: [],
  loading: false,
  error: null,
};

const listingsSlice = createSlice({
  name: 'listings',
  initialState,
  reducers: {
    fetchListingsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchListingsSuccess: (state, action) => {
        // console.log('Reducer Payload:', action.payload);
      state.loading = false;
      state.listings = action.payload;
    },
    fetchListingsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchListingsStart,
  fetchListingsSuccess,
  fetchListingsFailure,
} = listingsSlice.actions;

export default listingsSlice.reducer;
