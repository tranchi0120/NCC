import { NavigateFunction } from 'react-router';
import axiosClient from '../api/axiosClient';
import { AppDispatch } from '../redux/store';
import Noti from '../Noti/notification';
import ERoute from '../router/RouterLink';
import { ILoginActionData, IUserLoginData } from '../interfaces/interface';
import { loginFailed, loginStart, loginSuccess, logoutFailed, logoutSuccess } from '../redux/slice/AuthSlice';

export const login = async (
  user: IUserLoginData,
  dispatch: AppDispatch,
  navigate: NavigateFunction
): Promise<void> => {
  dispatch(loginStart());
  try {
    const { rememberClient } = user;
    const res = await axiosClient.post('/api/TokenAuth/Authenticate', user);
    console.log('res:', res);

    const loginData: ILoginActionData = {
      accessToken: res.data.result.accessToken,
      isRemember: rememberClient
    };

    dispatch(loginSuccess(loginData));
    navigate(ERoute.HOME);
    Noti.success({ message: 'Success', description: 'Login successfully.' });
  } catch (error) {
    dispatch(loginFailed());
  }
};

export const logout = async (
  dispatch: AppDispatch,
  navigate: NavigateFunction
): Promise<void> => {
  try {
    dispatch(logoutSuccess());
    navigate(ERoute.LOGIN);
    Noti.success({ message: 'Success', description: 'Logout successfully.' });
  } catch (error) {
    dispatch(logoutFailed());
  }
};
