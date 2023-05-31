import React, { ReactNode } from 'react';
import { Navigate, createBrowserRouter, useNavigate } from 'react-router-dom';
import ERoute from './RouterLink';
import Login from '../features/pages/Login/Login';
import NotFound from '../features/pages/NotFound/NotFound';
import App from '../App';
import Project from '../features/pages/Project/Project';
import getAccessToken from '../utils/getAccessToken';
import Home from '../features/pages/Home/Home';
interface props {
  children: ReactNode
}

export const PrivateRoute = ({ children }: props): any => {
  const userInfo = getAccessToken();
  const navigate = useNavigate();

  if (userInfo.length === 0) {
    return <Navigate to={ERoute.LOGIN} />;
  }

  React.useEffect(() => {
    if (userInfo.length > 0) {
      navigate(ERoute.HOME);
    }
  }, [navigate, userInfo]);

  return <>{children}</>;
};

const router = createBrowserRouter([
  {
    path: ERoute.NOT_FOUND,
    element: <NotFound />
  },
  {
    path: ERoute.LOGIN,
    element: <Login />
  },
  {
    path: ERoute.HOME,
    element: (
      <PrivateRoute>
        <App />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: ERoute.PROJECT,
        element: <Project />
      }
    ]
  }
]);

export default router;
