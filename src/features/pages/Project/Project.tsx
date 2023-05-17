import React from 'react';
import './Project.scss';
import { Button, Select } from 'antd';
import Search from 'antd/es/transfer/search';
import ProjectItem from './ProjectItem/ProjectItem';

const Project = (): JSX.Element => {
  const handleChange = (value: string): void => {
    console.log(`selected ${value}`);
  };

  return (
    <div className='project'>
      <div className="project-group">
        <h2 className='project-title'>Manage ProJects</h2>
        <div className="project-top">
          <Button type="primary"> + New ProJect</Button>
          <div className='project-top__search'>
            <Select
              className='project-top__filterSearch'
              defaultValue="lucy"
              onChange={handleChange}
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
      <div className="project-group">
        <div className="project-bottom">
          <ProjectItem />
        </div>
      </div>
    </div>
  );
};

export default Project;
