/* eslint-disable @typescript-eslint/no-misused-promises */
import React from 'react';
import logoNcc from '../../../assets/images/logoNcc.png';
import './Header.scss';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import ERoute from '../../../router/RouterLink';
import { logoutSuccess } from '../../../redux/slice/AuthSlice';
import Noti from '../../../Noti/notification';
import { ArrowLeftOutlined, MenuOutlined } from '@ant-design/icons';
import { selectSidebarStore, toggleSidebar } from '../../../redux/slice/SidabarSlice';

const Header = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isShowSidebar } = useAppSelector(selectSidebarStore);
  console.log(isShowSidebar);

  const handleLogout = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>): void => {
    e.stopPropagation();
    navigate(ERoute.LOGIN);
    dispatch(logoutSuccess());
    Noti.success({ message: 'Success', description: 'Logout successfully!' });
  };

  const handleToggleSidebar = (): void => {
    dispatch(toggleSidebar());
  };

  return (
    <div className='header'>
      <div className='header-left'>
        {isShowSidebar
          ? <ArrowLeftOutlined className='header-iconMenu' onClick={handleToggleSidebar} />
          : <MenuOutlined className='header-iconMenu' onClick={handleToggleSidebar} />}
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
