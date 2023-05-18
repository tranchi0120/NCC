import React, { useEffect, useState } from 'react';
import type { FC } from 'react';
import './Project.scss';
import { Button, Select } from 'antd';
import Search from 'antd/es/transfer/search';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { selectProjectStore } from '../../../redux/slice/ProjectSlice';
import getAllProject from '../../../redux/thunnkFuntion/getAllProject';
import { EProjectStatus } from '../../../interfaces/interface';
import { CircularProgress } from '@material-ui/core';
import ProjectItem from './components/ProjectItem/ProjectItem';
import sortProject from '../../../utils/sortProject';

const Project: FC = () => {
  const dispatch = useAppDispatch();
  const [projectSelected, setProjectSelected] = useState(EProjectStatus.ACTIVE);

  const onSelectChange = (value: number): void => {
    setProjectSelected(value);
  };

  const { allProject } = useAppSelector(selectProjectStore);

  useEffect(() => {
    const fetchProject = async (): Promise<void> => {
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
              className='project-top__filterSearch'
              onChange={onSelectChange}
              options={[
                { value: 'jack', label: 'Jack' },
                { value: 'lucy', label: 'Ludy' },
                { value: 'Yiminghe', label: 'yiminghe' },
                { value: 'disabled', label: 'Disabled' }
              ]}
            />
            <Search placeholder="input search text" />
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
