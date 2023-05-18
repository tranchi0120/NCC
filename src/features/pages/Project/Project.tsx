import React, { useEffect, useState, useMemo, useRef } from 'react';
import type { FC } from 'react';
import './Project.scss';
import { Button, Select, Input as Search, InputRef } from 'antd';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { selectProjectStore } from '../../../redux/slice/ProjectSlice';
import getAllProject from '../../../redux/thunnkFuntion/getAllProject';
import { EProjectStatus, EProjectStatusTitle } from '../../../interfaces/interface';
import { CircularProgress } from '@material-ui/core';
import ProjectItem from './components/ProjectItem/ProjectItem';
import sortProject from '../../../utils/sortProject';
import getProjectQuantity from '../../../redux/thunnkFuntion/getQuantityProject';
import { SearchOutlined } from '@ant-design/icons';

const Project: FC = () => {
  const dispatch = useAppDispatch();
  const { allProject, projectQuantity } = useAppSelector(selectProjectStore);
  const [projectSelected, setProjectSelected] = useState(EProjectStatus.ACTIVE);
  const [searchValue, setSearchValue] = useState('');
  const inputSearchRef = useRef<InputRef | null>(null);

  const optionCanSelect = useMemo(() => {
    return [
      {
        value: EProjectStatus.ACTIVE,
        label: `${EProjectStatusTitle.ACTIVE} (${projectQuantity.active})`
      },
      {
        value: EProjectStatus.DEACTIVE,
        label: `${EProjectStatusTitle.DEACTIVE} (${projectQuantity.deactive})`
      },
      {
        value: EProjectStatus.ALL,
        label: `${EProjectStatusTitle.ALL} (${projectQuantity.active + projectQuantity.deactive})`
      }
    ];
  }, [projectQuantity]);

  const onSelectChange = (value: number): void => {
    setProjectSelected(value);
  };

  const onInputEnter = async (status: number, searchValue: string | undefined): Promise<void> => {
    await dispatch(getAllProject({ status, searchValue }));
  };

  useEffect(() => {
    const fetchProject = async (): Promise<void> => {
      await dispatch(getProjectQuantity());
      await dispatch(getAllProject({ status: projectSelected }));
    };
    void fetchProject();
  }, [projectSelected]);

  return (
    <div className='project'>
      <div className="project-group">
        <h2 className='project-title'>Manage ProJects</h2>
        <div className="project-top">
          <Button type="primary"> + New ProJect</Button>
          <div className='project-top__search'>
            <Select
              defaultValue={EProjectStatus.ACTIVE}
              onChange={onSelectChange}
              value={projectSelected}
              options={optionCanSelect}
              className='project-top__filterSearch'
            />
            <Search
              ref={inputSearchRef}
              className='search-area'
              size='large'
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onPressEnter={() => {
                void onInputEnter(projectSelected, searchValue);
              }}
              placeholder='Search by client or project name'
              prefix={<SearchOutlined className='search-icon' />}
            />
          </div>
        </div>
      </div>
      <div className="project-groupItem">
        <div className="project-bottom">

          {allProject.isLoading
            ? (<div className='project-loading'><CircularProgress /></div>)
            : (
              <>
                {allProject.data.length > 0 &&
                  sortProject(allProject.data).map((project) => (
                    <ProjectItem key={project.customerName} projectItem={project} />
                  ))}
              </>)
          }
        </div>
      </div>
    </div>
  );
};

export default Project;
