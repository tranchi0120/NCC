import React, { ReactNode, useEffect } from 'react';
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
  const navigate = useNavigate();
  const userInfo = getAccessToken();
  useEffect(() => {
    if (userInfo.length > 0) {
      navigate(ERoute.HOME);
    }
  }, []);

  if (userInfo.length === 0) {
    return <Navigate to={ERoute.LOGIN} />;
  }
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
        element: (
          <PrivateRoute>
            <Project />
          </PrivateRoute>
        )
      }
    ]
  }
]);

export default router;
