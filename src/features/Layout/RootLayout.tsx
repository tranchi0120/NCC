import * as React from 'react';
import type { FC } from 'react';
import { Layout } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';
export interface ISidebarLayoutProps {
  children: React.ReactNode
}

const RootLayout: FC<ISidebarLayoutProps> = ({ children }) => {
  return (
    <Layout>
      <Header>Header</Header>
      <Layout>
        <Sider >Sider</Sider>
        <Content>{children}</Content>
      </Layout>
    </Layout>
  );
};

export default RootLayout;
