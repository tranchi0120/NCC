import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { ILoginActionData, IUserLoginData, ILoginResponse } from '../../interfaces/interface';
import axiosClient from '../../api/axiosClient';

export const USER_INFO = 'USER_INFO';

interface IAuthState {
  isLoading: boolean
  isRemember: boolean
  error: string
  accessToken: string
}

const initialState: IAuthState = {
  isLoading: false,
  isRemember: false,
  error: '',
  accessToken: ''
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logoutSuccess: (state) => {
      state = initialState;
      localStorage.removeItem(USER_INFO);
      sessionStorage.removeItem(USER_INFO);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = '';
        state.accessToken = action.payload.accessToken;
        state.isRemember = action.payload.isRemember;

        if (action.payload.isRemember) {
          localStorage.setItem(USER_INFO, action.payload.accessToken);
        } else {
          sessionStorage.setItem(USER_INFO, action.payload.accessToken);
        }
      })
      .addCase(userLogin.rejected, (state) => {
        state.isLoading = false;
        state.error = 'Login failed!';
      });
  }
});

export const userLogin = createAsyncThunk('auth/login', async (user: IUserLoginData) => {
  const { rememberClient } = user;

  const response: ILoginResponse = await axiosClient.post('/api/TokenAuth/Authenticate', user);
  console.log('response:', response);
  const loginData: ILoginActionData = {
    accessToken: response.accessToken,
    isRemember: rememberClient
  };

  return loginData;
});

export const { logoutSuccess } = authSlice.actions;
export const selectAuthStore = (state: RootState): IAuthState => state.auth;
export default authSlice.reducer;
