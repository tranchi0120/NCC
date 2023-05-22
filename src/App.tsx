import React from 'react';
import './App.scss';
import './assets/styles/layout.scss';
import Sidebar from './features/Layout/Sidebar/Sidebar';
import { Outlet } from 'react-router-dom';
import Header from './features/Layout/Header/Header';
import { selectSidebarStore, toggleSidebar } from './redux/slice/SidabarSlice';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import AppProvider from './context/AppProvider';

const App = (): JSX.Element => {
  const { isShowSidebar } = useAppSelector(selectSidebarStore);
  const dispatch = useAppDispatch();

  const hanleCloseSidebar = (): void => {
    dispatch(toggleSidebar());
  };

  return (
    <div className='App'>
      <AppProvider>
        <div className='layout'>
          <div className='layout-header layout-commont'>
            <Header />
          </div>
          <div className='layout-bottom'>
            {isShowSidebar
              ? (
                <>
                  <aside className='layout-sidebar sidebarOpen layout-commont'>
                    <Sidebar />
                  </aside>
                  <div className='overlay' onClick={hanleCloseSidebar}></div>
                </>)
              : (<aside className='layout-sidebar layout-commont'>
                <Sidebar />
              </aside>)}
            <div className='layout-children layout-commont'>
              <Outlet />
            </div>
          </div>
        </div>
      </AppProvider>

    </div>
  );
};

export default App;
