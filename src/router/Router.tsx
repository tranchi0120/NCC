import React, { ReactNode } from 'react';
import { createBrowserRouter, useNavigate } from 'react-router-dom';
import ERoute from './RouterLink';
import Login from '../features/pages/Login/Login';
import NotFound from '../features/pages/NotFound/NotFound';
import App from '../App';
import Project from '../features/pages/Project/Project';
import getAccessToken from '../utils/getAccessToken';
import Home from '../features/pages/Home/Home';
import FormTabs from '../features/pages/Project/Forms/FormTabs/FormTabs';
interface props {
  children: ReactNode
}
export const PrivateRoute = ({ children }: props): JSX.Element => {
  const navigate = useNavigate();
  const userInfo = getAccessToken();

  React.useEffect(() => {
    if (userInfo.length === 0) {
      navigate(ERoute.LOGIN);
    } else {
      navigate(ERoute.HOME);
    }
  }, [userInfo, navigate]);

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
        element: <Project />,
        children: [
          {
            path: ERoute.GENERAL_FORM,
            element: <FormTabs />
          },
          {
            path: ERoute.TEAM_FORM,
            element: <FormTabs />
          },
          {
            path: ERoute.TASK_FORM,
            element: <FormTabs />
          },
          {
            path: ERoute.NOTIFICATION_KOMU,
            element: <FormTabs />
          }
        ]
      }
    ]
  }
]);

export default router;
