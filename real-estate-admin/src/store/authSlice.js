import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios, { endpoints } from 'src/utils/axios';
import { setSession, isValidToken } from 'src/utils/jwt';
import { STORAGE_KEY } from 'src/utils/constant';
import { getCookie, deleteCookie } from 'src/utils/cookie';

const initialState = {
  user: null,
  role: null,
  loading: false,
  authenticated: false,
  error: null,
};

// Async action to check user session
export const checkUserSession = createAsyncThunk(
  'auth/checkSession',
  async (_, { rejectWithValue }) => {
    try {
      const accessToken = sessionStorage.getItem(STORAGE_KEY) || getCookie(STORAGE_KEY);

      if (accessToken && isValidToken(accessToken)) {
        setSession(accessToken);
        const { data } = await axios.get(endpoints.auth.me);
        return { user: data.user, role: data.role, token: accessToken, authenticated:true };
      }
      return rejectWithValue('No valid session found');
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async action to login
export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(endpoints.auth.signIn, { email, password });
      const { accessToken, role } = data;
      setSession(accessToken);
      return { user: data.user, role, token: accessToken };
    } catch (error) {
      return rejectWithValue('Invalid credentials');
    }
  }
);

// Async action to logout
export const logout = createAsyncThunk('auth/logout', async () => {
  setSession(null);
  deleteCookie('access-token');
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkUserSession.pending, (state) => {
        state.loading = true;
        state.authenticated = false;
      })
      .addCase(checkUserSession.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.role = action.payload.role;
        state.authenticated = true;
        state.loading = false;
      })
      .addCase(checkUserSession.rejected, (state, action) => {
        state.error = action.payload;
        state.authenticated = false;
        state.loading = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.role = action.payload.role;
        state.authenticated = true;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload;
        state.authenticated = false;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.role = null;
        state.authenticated = false;
      });
  },
});

export default authSlice.reducer;
