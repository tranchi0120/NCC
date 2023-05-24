import React, { useCallback } from 'react';
import type { FC } from 'react';
import './ProjectItem.scss';
import { Button, Dropdown, MenuProps, Space, Tag, Tooltip } from 'antd';
import { CheckCircleOutlined, DeleteOutlined, DownOutlined, EditOutlined, ExclamationCircleOutlined, EyeOutlined, FolderViewOutlined } from '@ant-design/icons';
import { IAllProjectResponse, ISortProjectState } from '../../../../../interfaces/interface';
import { EProjectType } from '../../../../../enums/enums';
import { format } from 'date-fns';
interface IProjectItemProps {
  projectItem: ISortProjectState
}

const ProjectItem: FC<IProjectItemProps> = ({ projectItem }) => {
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
        return EProjectType.PR;
      }
      case 5: {
        return EProjectType.TR;
      }
      default: {
        return null;
      }
    }
  };

  const getMenuItems = useCallback((project: IAllProjectResponse): MenuProps['items'] => {
    return [
      {
        label: 'Edit',
        key: '1',
        icon: <EditOutlined />
      },
      {
        label: 'View',
        key: '2',
        icon: <EyeOutlined />
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
                {(item.projectType > 0)
                  ? (<span className='projectItem-projectType'>{getProjectType(item.projectType)}</span>)
                  : <span></span>
                }
                <span className='projectItem-time'>
                  {format(new Date(item.timeStart), 'dd/MM/yyyy')}
                  {(item.timeEnd != null) ? ' - ' + format(new Date(item.timeEnd), 'dd/MM/yyyy') : ''}
                </span>
              </div>
              <div className="projectItem-action">
                {item.status === 0
                  ? (
                    <Tag icon={<CheckCircleOutlined />} color='success'>
                      Active
                    </Tag>)
                  : (
                    <Tag icon={<ExclamationCircleOutlined />} color='warning'>
                      Deactive
                    </Tag>)}
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
