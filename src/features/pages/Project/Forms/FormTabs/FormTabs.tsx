import React, { useContext, useState, useEffect } from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import Ganeral from '../Ganeral/Ganeral';
import Team from '../Team/Team';
import Tasks from '../Tasks/Tasks';
import Notification from '../Notification/Notification';
import { useNavigate } from 'react-router-dom';
import ERoute from '../../../../../router/RouterLink';
import { AppContext } from '../../../../../context/AppContext';

const FormTabs: React.FC = () => {
  const navigate = useNavigate();
  const { isOpen } = useContext(AppContext);
  const [activeKey, setActiveKey] = useState('1');
  useEffect(() => {
    if (isOpen) {
      return;
    }
    setActiveKey('1');
  }, [isOpen]);

  const onChange = (key: string): void => {
    setActiveKey(key);
    switch (key) {
      case '1': {
        navigate(ERoute.GENERAL_FORM);
        break;
      }
      case '2': {
        navigate(ERoute.TEAM_FORM);
        break;
      }
      case '3': {
        navigate(ERoute.TASK_FORM);
        break;
      }
      case '4': {
        navigate(ERoute.NOTIFICATION_KOMU);
        break;
      }
    }
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

  return <Tabs className='form-tabs' activeKey={activeKey} items={items} onChange={onChange} />;
};

export default FormTabs;
