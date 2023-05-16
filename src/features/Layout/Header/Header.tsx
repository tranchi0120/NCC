/* eslint-disable @typescript-eslint/no-misused-promises */
import React from 'react';
import logoNcc from '../../../assets/images/logoNcc.png';
import './Header.scss';
import * as authServices from '../../../services/authServices';
// import { AppDispatch } from '../../../redux/store';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../redux/hooks';

const Header = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = async (): Promise<void> => {
    await authServices.logout(dispatch, navigate);
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
