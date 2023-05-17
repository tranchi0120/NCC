import React from 'react';
import avt from '../../../assets/images/avatar.jpg';
import HomeIcon from '@mui/icons-material/Home';
import AssessmentIcon from '@mui/icons-material/Assessment';
import './Sidebar.scss';
import { Link } from 'react-router-dom';
import ERoute from '../../../router/RouterLink';

const Sidebar = (): JSX.Element => {
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
        <Link to={ERoute.HOME} className="sidebar-box">
          <HomeIcon />
          <span>Home</span>
        </Link>
        <Link to={ERoute.PROJECT} className="sidebar-box">
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
