import axios, { AxiosError } from 'axios';
import ERoute from '../router/RouterLink';
import Noti from '../Noti/notification';
import getAccessToken from '../utils/getAccessToken';

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API,
  headers: {
    'Content-Type': 'application/json'
  }
});

axiosClient.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();
    config.headers.Authorization = `Bearer ${accessToken ?? ''}`;
    return config;
  },
  async (error: AxiosError): Promise<AxiosError> => {
    return await Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response) => {
    if (response.data?.result !== null) {
      return response.data.result;
    }
    return response;
  },
  async (error: AxiosError): Promise<AxiosError> => {
    const status = error.response?.status;

    switch (status) {
      case 401: {
        window.location.href = ERoute.LOGIN;
        Noti.error({ description: 'Unauthorized!', message: 'Error' });
      }
    }

    return await Promise.reject(error);
  }
);
export default axiosClient;
