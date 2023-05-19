import * as React from 'react';
import type { FC } from 'react';
import { Layout } from 'antd';
import { Content, Header as AHeader } from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';
import Sidebar from './Sidebar/Sidebar';
import Header from './Header/Header';
export interface ISidebarLayoutProps {
  children: React.ReactNode
}

const headerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  height: 64,
  paddingInline: 50,
  lineHeight: '64px',
  backgroundColor: '#7dbcea'
};

const siderStyle: React.CSSProperties = {
  textAlign: 'center',
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#3ba0e9'
};

const RootLayout: FC<ISidebarLayoutProps> = ({ children }) => {
  return (
    <Layout>
      <AHeader style={headerStyle}><Header /></AHeader>
      <Layout>
        <Sider style={siderStyle}><Sidebar /></Sider>
        <Content style={siderStyle}>{children}</Content>
      </Layout>
    </Layout>
  );
};

export default RootLayout;
