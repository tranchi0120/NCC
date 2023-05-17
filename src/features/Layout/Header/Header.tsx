/* eslint-disable @typescript-eslint/no-misused-promises */
import React from 'react';
import logoNcc from '../../../assets/images/logoNcc.png';
import './Header.scss';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../redux/hooks';
import ERoute from '../../../router/RouterLink';
import { logoutSuccess } from '../../../redux/slice/AuthSlice';
import Noti from '../../../Noti/notification';

const Header = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>): void => {
    e.stopPropagation();
    navigate(ERoute.LOGIN);
    dispatch(logoutSuccess());
    Noti.success({ message: 'Success', description: 'Logout successfully!' });
  };

  return (
    <div className='header'>
      <div className='header-left'>
        <div className="header-img">
          <img className='header-img__logo' src={logoNcc} alt="#!" />
        </div>
        <h2 className='header-title'>TimeSheet</h2>
      </div>
      <button className='header-logout' onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Header;
