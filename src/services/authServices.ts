import { NavigateFunction } from 'react-router';
import axiosClient from '../api/axiosClient';
import { AppDispatch } from '../redux/store';
import Noti from '../Noti/notification';
import ERoute from '../router/RouterLink';
import { ILoginActionData, IUserLoginData } from '../interfaces/interface';
import { loginFailed, loginStart, loginSuccess } from '../redux/slice/AuthSlice';

export const login = async (
  user: IUserLoginData,
  dispacth: AppDispatch,
  navigate: NavigateFunction
): Promise<void> => {
  dispacth(loginStart());
  try {
    const { rememberClient } = user;
    const res = await axiosClient.post('/api/TokenAuth/Authenticate', user);

    const loginData: ILoginActionData = {
      accessToken: res.data.result.accessToken,
      isRemember: rememberClient
    };

    dispacth(loginSuccess(loginData));
    navigate(ERoute.HOME);
    Noti.success({ message: 'Success', description: 'Login successfully.' });
  } catch (error) {
    dispacth(loginFailed());
  }
};
