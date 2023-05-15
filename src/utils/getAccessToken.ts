import { USER_INFO } from '../redux/slice/AuthSlice';

const getAccessToken = (): string => {
  const accessToken = localStorage.getItem(USER_INFO) ?? sessionStorage.getItem(USER_INFO);
  if (accessToken === null) {
    return '';
  }
  return accessToken;
};

export default getAccessToken;
