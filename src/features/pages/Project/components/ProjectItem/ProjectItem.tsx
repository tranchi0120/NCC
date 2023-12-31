/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useCallback, useContext } from 'react';
import type { FC } from 'react';
import './ProjectItem.scss';
import { Button, Dropdown, MenuProps, Space, Tag, Tooltip } from 'antd';
import { CheckCircleOutlined, DeleteOutlined, DownOutlined, EditOutlined, ExclamationCircleOutlined, EyeOutlined, FolderViewOutlined } from '@ant-design/icons';
import { IAllProjectResponse, IModalContent, ISortProjectState } from '../../../../../interfaces/interface';
import { format } from 'date-fns';
import getProjectType from '../../../../../utils/getProjectType';
import { useAppDispatch } from '../../../../../redux/hooks';
import { DeleteProject, getAllProject } from '../../../../../redux/ThunkFunction/ThunkFunction';
import { AppContext } from '../../../../../context/AppContext';
import FormTabs from '../../Forms/FormTabs/FormTabs';
import Swal from 'sweetalert2';
import { activeProject, inActiveProject } from '../../../../../services/services';
import Noti from '../../../../../Noti/notification';
interface IProjectItemProps {
  projectItem: ISortProjectState
}

const ProjectItem: FC<IProjectItemProps> = ({ projectItem }) => {
  const dispatch = useAppDispatch();
  const { setIsOpen, setModalContent } = useContext(AppContext);

  const onEditModal = useCallback(
    async (modalContent: IModalContent, projectId?: number): Promise<void> => {
      setIsOpen(true);
      setModalContent(modalContent);
      if (projectId == null) {
        return;
      }
      await dispatch(DeleteProject(projectId));
    },
    []
  );

  const getMenuItems = useCallback((project: IAllProjectResponse): MenuProps['items'] => {
    const handleDelete = (id: number): void => {
      void Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this item!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then(async (result) => {
        if (result.isConfirmed) {
          const result = await dispatch(DeleteProject(id));
          if (result.type === 'project/deleteProject/fulfilled') {
            Noti.success({ message: 'Success', description: ' Delete project successfully!' });
          } else if (result.type === 'project/deleteProject/rejected') {
            Noti.error({ message: 'Error', description: 'Fail to Delete project!' });
          }
        }
      });
    };

    const handleActiveOrDeactive = async (): Promise<void> => {
      void Swal.fire({
        title: 'Are you sure?',
        text: project.name,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes!'
      }).then(async (result) => {
        if (result.isConfirmed) {
          if (project != null) {
            try {
              let res;
              if (project.status === 0) {
                res = await inActiveProject(project.id);
              } else {
                res = await activeProject(project.id);
              }
              if (res.status === 200) {
                Noti.success({ message: 'Success', description: project.status === 0 ? 'Deactive project successfully!' : 'Active project successfully!' });
              }
              void dispatch(getAllProject(project));
            } catch (error) {
              Noti.error({ message: 'Error', description: 'Fail to create new project!' });
            }
          }
        }
      });
    };
    return [
      {
        label: 'Edit',
        key: '1',
        icon: <EditOutlined />,
        onClick: () => {
          void onEditModal(
            {
              title: `Edit Project: ${project.name}`,
              children: <FormTabs />
            },
            project.id
          );
        }
      },
      {
        label: 'View',
        key: '2',
        icon: <EyeOutlined />
      },
      {
        label: project.status === 0 ? 'Deactive' : 'Active',
        key: '3',
        icon: <FolderViewOutlined />,
        onClick: async () => {
          await handleActiveOrDeactive();
        }
      },
      {
        label: 'Delete',
        key: '4',
        icon: <DeleteOutlined />,
        onClick: () => handleDelete(project.id)
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
