import React from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import Team from '../Team/Team';
import Tasks from '../Tasks/Tasks';
import Notification from '../Notification/Notification';
import Ganeral from '../Ganeral/Ganeral';

const FormTabs: React.FC = () => {
  const onChange = (key: string): void => {
    console.log(key);
  };

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Ganeral',
      children: <Ganeral />
    },
    {
      key: '2',
      label: 'Team',
      children: <Team />
    },
    {
      key: '3',
      label: 'Tasks',
      children: <Tasks />
    },
    {
      key: '4',
      label: 'Notification',
      children: <Notification />
    }
  ];

  return <Tabs defaultActiveKey="1" items={items} onChange={onChange} />;
};

export default FormTabs;
