import React, { useEffect, useState, useMemo, useRef, useCallback, useContext } from 'react';
import type { FC } from 'react';
import './Project.scss';
import { Button, Select, Input as Search, InputRef } from 'antd';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { selectProjectStore } from '../../../redux/slice/ProjectSlice';
import { IModalContent } from '../../../interfaces/interface';
import { CircularProgress } from '@material-ui/core';
import ProjectItem from './components/ProjectItem/ProjectItem';
import sortProject from '../../../utils/sortProject';
import { SearchOutlined } from '@ant-design/icons';
import { EProjectStatus, EProjectStatusTitle } from '../../../enums/enums';
import { AppContext } from '../../../context/AppContext';
import FormTabs from './Forms/FormTabs/FormTabs';
import { getAllProject, getProjectQuantity } from '../../../redux/ThunkFunction/ThunkFunction';

const Project: FC = () => {
  const dispatch = useAppDispatch();
  const { allProject, projectQuantity } = useAppSelector(selectProjectStore);
  const [filterSelected, setFilterSelected] = useState(EProjectStatus.ACTIVE);
  const [searchValue, setSearchValue] = useState('');
  const inputSearchRef = useRef<InputRef | null>(null);
  const { setIsOpen, setModalContent } = useContext(AppContext);

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

  const onInputEnter = async (status: number, searchValue: string | undefined): Promise<void> => {
    await dispatch(getAllProject({ status, searchValue }));
  };

  const onSelectChange = (value: number): void => {
    setFilterSelected(value);
  };

  const handleOpenModal = useCallback((modalContent: IModalContent) => {
    setIsOpen(true);
    setModalContent(modalContent);
  }, []);

  useEffect(() => {
    const fetchProject = async (): Promise<void> => {
      await dispatch(getProjectQuantity());
      await dispatch(getAllProject({ status: filterSelected }));
    };
    void fetchProject();
  }, [filterSelected]);

  return (
    <div className='project'>
      <div className="project-group">
        <h2 className='project-title'>Manage ProJects</h2>
        <div className="project-top">
          <Button
            type='primary'
            onClick={() => handleOpenModal({ title: 'Create Project', children: <FormTabs /> })}> + New ProJect</Button>
          <div className='project-top__search'>
            <Select
              defaultValue={EProjectStatus.ACTIVE}
              onChange={onSelectChange}
              value={filterSelected}
              options={optionCanSelect}
              className='project-wrapperSearch project-top__filterSearch '
              disabled={allProject.isLoading}
            />
            <Search
              ref={inputSearchRef}
              className='search-area project-wrapperSearch'
              size='large'
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onPressEnter={() => {
                void onInputEnter(filterSelected, searchValue);
              }}
              placeholder='Search by client or project name'
              prefix={<SearchOutlined className='search-icon' />}
              disabled={allProject.isLoading}
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
