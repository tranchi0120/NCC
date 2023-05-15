import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { ILoginActionData } from '../../interfaces/interface';

export const USER_INFO = 'USER_INFO';

interface IAuthState {
  isLoading: boolean
  isRemember: boolean
  isError: boolean
  accessToken: string
}

const initialState: IAuthState = {
  isLoading: false,
  isRemember: false,
  isError: false,
  accessToken: ''
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isLoading = true;
    },
    loginSuccess: (state, actions: PayloadAction<ILoginActionData>) => {
      state.isLoading = false;
      state.isError = false;
      state.isRemember = actions.payload.isRemember;
      state.accessToken = actions.payload.accessToken;

      if (actions.payload.isRemember) {
        localStorage.setItem(USER_INFO, actions.payload.accessToken);
      } else {
        sessionStorage.setItem(USER_INFO, actions.payload.accessToken);
      }
    },
    loginFailed: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
    logoutSuccess: (state) => {
      state.isError = false;
      state.isRemember = false;
      state.accessToken = '';
      localStorage.removeItem(USER_INFO);
      sessionStorage.removeItem(USER_INFO);
    },
    logoutFailed: (state) => {
      state.isError = true;
    }
  }
});

export const { loginStart, loginSuccess, loginFailed, logoutSuccess, logoutFailed } =
  authSlice.actions;

export const selectAuthStore = (state: RootState): IAuthState => state.auth;

export default authSlice.reducer;
