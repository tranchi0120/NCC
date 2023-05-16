import React from 'react';
import './App.scss';
import './assets/styles/layout.scss';
import Sidebar from './features/Layout/Sidebar/Sidebar';
import { Outlet } from 'react-router-dom';
import Header from './features/Layout/Header/Header';

const App = (): JSX.Element => {
  return (
    <div className='App'>
      <div className='layout'>
        <div className='layout-header layout-commont'>
          <Header />
        </div>
        <div className='layout-bottom'>
          <div className='layout-sidebar layout-commont'>
            <Sidebar />
          </div>
          <div className='layout-children layout-commont'>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
