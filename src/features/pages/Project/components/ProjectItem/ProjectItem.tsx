import React, { useCallback } from 'react';
import type { FC } from 'react';
import './ProjectItem.scss';
import { Button, Dropdown, MenuProps, Space, message } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { EProjectType, ISortProjectState } from '../../../../../interfaces/interface';

interface IProjectItemProps {
  projectItem: ISortProjectState
}

const ProjectItem: FC<IProjectItemProps> = ({ projectItem }) => {
  const getProjectTime = useCallback(
    (timeStart: string | null, timeEnd: string | null): string | null => {
      if (timeStart === null || timeEnd === null) {
        return null;
      }
      return `${timeStart.split('T')[0]} - ${timeEnd.split('T')[0]}`;
    },
    []
  );

  const getProjectType = (projectType: number): string | null => {
    switch (projectType) {
      case 0: {
        return EProjectType.TM;
      }
      case 1: {
        return EProjectType.FF;
      }
      case 2: {
        return EProjectType.NB;
      }
      case 3: {
        return EProjectType.ODC;
      }
      case 4: {
        return EProjectType.P;
      }
      case 5: {
        return EProjectType.T;
      }
      default: {
        return null;
      }
    }
  };

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    void message.info('Click on menu item.');
    console.log('click', e);
  };
  const items: MenuProps['items'] = [
    {
      label: '1st menu item',
      key: '1',
      icon: <UserOutlined />
    },
    {
      label: '2nd menu item',
      key: '2',
      icon: <UserOutlined />
    },
    {
      label: '3rd menu item',
      key: '3',
      icon: <UserOutlined />
    },
    {
      label: '4rd menu item',
      key: '4',
      icon: <UserOutlined />,
      danger: true
    }
  ];

  const menuProps = {
    items,
    onClick: handleMenuClick
  };
  return (
    <div className='projectItem'>
      <h2 className='projectItem-clientName'>{projectItem.customerName}</h2>
      {projectItem.projects.length > 0 &&
        projectItem.projects.map((item) => {
          return (
            <div className='projectItem-profile' key={item.id}>
              <div className='projectItem-info'>
                <span className='projectItem-nameProject'>{item.name}</span>
                <div>
                  <span className='projectItem-mentor'>{item.psm}</span>
                </div>
                <span className='projectItem-quantityStaff'>{`${item.activeMember} members`}</span>
                <span className='projectItem-projectType'>{getProjectType(item.projectType)}</span>
                <span className='projectItem-time'>{getProjectTime(item.timeStart, item.timeEnd)}</span>
              </div>
              <div className="projectItem-action">
                <Dropdown menu={menuProps}>
                  <Button>
                    <Space>
                      Action
                      <DownOutlined />
                    </Space>
                  </Button>
                </Dropdown>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default ProjectItem;
