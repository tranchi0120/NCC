import * as React from 'react';
import type { FC } from 'react';
import { Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';

export interface ISidebarLayoutProps {
  children: React.ReactNode
}

const RootLayout: FC<ISidebarLayoutProps> = ({ children }) => {
  return (
    <Layout>
      {/* <Header className='header'>Header</Header> */}
      <Layout>
        <Sider>Sidebar</Sider>
        <Layout>
          <Content>{children}</Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default RootLayout;
