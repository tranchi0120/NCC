import React from 'react';
import avt from '../../../assets/images/avatar.jpg';
import HomeIcon from '@mui/icons-material/Home';
import AssessmentIcon from '@mui/icons-material/Assessment';
import './Sidebar.scss';
import { Link } from 'react-router-dom';
import ERoute from '../../../router/RouterLink';
import { useAppDispatch } from '../../../redux/hooks';
import { toggleSidebar } from '../../../redux/slice/SidabarSlice';

const Sidebar = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const handleToggleSidebar = (): void => {
    dispatch(toggleSidebar());
  };
  return (
    <div className='sidebar'>
      <div className="sidebar-top">
        <div className="sidebar-img">
          <img className='sidebar-img__avt' src={avt} alt="#!" />
        </div>
        <div className="sidebar-info">
          <span className='sidebar-info__name'>Trần Chí</span>
          <span className='sidebar-info__email'>chi.tran@ncc.asia</span>
        </div>
      </div>
      <div className="sidebar-bottom ">
        <Link to={ERoute.HOME} className="sidebar-box" onClick={handleToggleSidebar}>
          <HomeIcon />
          <span>Home</span>
        </Link>
        <Link to={ERoute.PROJECT} className="sidebar-box" onClick={handleToggleSidebar}>
          <AssessmentIcon />
          <span>
            Project
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
