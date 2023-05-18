import React, { useCallback } from 'react';
import type { FC } from 'react';
import './ProjectItem.scss';
import { Button, Dropdown, MenuProps, Space, Tooltip } from 'antd';
import { DeleteOutlined, DownOutlined, EditOutlined, EyeOutlined, FolderViewOutlined } from '@ant-design/icons';
import { EProjectActionName, EProjectType, IAllProjectResponse, ISortProjectState } from '../../../../../interfaces/interface';
import { useAppDispatch } from '../../../../../redux/hooks';
import { IModalAction, modalOpen } from '../../../../../redux/slice/projectActionsSlice';

interface IProjectItemProps {
  projectItem: ISortProjectState
}

const ProjectItem: FC<IProjectItemProps> = ({ projectItem }) => {
  const dispatch = useAppDispatch();
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
  const handleMenuClick = ({ action, title }: IModalAction, project: IAllProjectResponse): void => {
    dispatch(modalOpen({ action, title }));
    // Handle with "project" after
  };

  const getMenuItems = useCallback((project: IAllProjectResponse): MenuProps['items'] => {
    return [
      {
        label: 'Edit',
        key: '1',
        icon: <EditOutlined />,
        onClick: () =>
          handleMenuClick({ action: EProjectActionName.EDIT, title: 'Edit Project' }, project)
      },
      {
        label: 'View',
        key: '2',
        icon: <EyeOutlined />,
        onClick: () =>
          handleMenuClick({ action: EProjectActionName.VIEW, title: 'View Project' }, project)
      },
      {
        label: 'Deactive',
        key: '3',
        icon: <FolderViewOutlined />
      },
      {
        label: 'Delete',
        key: '4',
        icon: <DeleteOutlined />
      }
    ];
  }, []);

  return (
    <div className='projectItem'>
      <h2 className='projectItem-clientName'>{projectItem.customerName}</h2>
      {projectItem.projects.length > 0 &&
        projectItem.projects.map((item) => {
          const items = getMenuItems(item);

          const menuProps = { items };
          return (
            <div className='projectItem-profile' key={item.id}>
              <div className='projectItem-info'>
                <span className='projectItem-nameProject'>{item.name}</span>
                <Tooltip zIndex={90} title={item.pms.join(', ')} className='project-members'>
                  <span className='projectItem-mentor'>{item.pms.join(', ')}</span>
                </Tooltip>
                <span className='projectItem-quantityStaff'>{`${item.activeMember} members`}</span>
                <span className='projectItem-projectType'>{getProjectType(item.projectType)}</span>
                <span className='projectItem-time'>{getProjectTime(item.timeStart, item.timeEnd)}</span>
              </div>
              <div className="projectItem-action">
                <Dropdown placement='bottomRight'
                  menu={menuProps}
                  trigger={['click']}
                  className='actions-dropdown'>
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
