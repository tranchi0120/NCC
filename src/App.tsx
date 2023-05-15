import React from 'react';
import './App.scss';
import Sidebar from './features/Layout/Sidebar/Sidebar';
import { Outlet } from 'react-router-dom';
import Header from './features/Layout/Header/Header';

const App = (): JSX.Element => {
  return (
    <div className="App">
      <Header />
      <div>
        <div>
          <Sidebar />
        </div>
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default App;
