import React from 'react';
import { Collapse, Select, Space, Input } from 'antd';
import './Team.scss';

const { Panel } = Collapse;
const { Search } = Input;
const Team = (): JSX.Element => {
  const onSearch = (value: string): void => console.log(value);
  return (
    <div className='team'>
      <Collapse>
        <Panel header="Team" key="1">
        </Panel>
      </Collapse>
      <Collapse>
        <Panel header="Select team member" key="1">
          <Space wrap>
            <div>
              <Select
                defaultValue='All'
                showSearch
                style={{ width: 200 }}
                placeholder="Search to Select"
                optionFilterProp="children"
                filterOption={(input, option) => (option?.label ?? '').includes(input)}
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                }
                options={[
                  { value: 'all', label: 'All' },
                  { value: 0, label: 'Hà Nội' },
                  { value: 1, label: 'Sài Gòn' },
                  { value: 2, label: 'Kon Tum' },
                  { value: 3, label: 'Đà Nẵng' }
                ]}
              />
            </div>
            <div>
              <Select
                defaultValue='All'
                showSearch
                style={{ width: 200 }}
                placeholder="Search to Select"
                optionFilterProp="children"
                filterOption={(input, option) => (option?.label ?? '').includes(input)}
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                }
                options={[
                  { value: 'all', label: 'All' },
                  { value: 0, label: 'Staff' },
                  { value: 1, label: 'Internship' },
                  { value: 2, label: 'Collaborator' }
                ]}
              />
            </div>
            <div>
              <Search placeholder="input search text" onSearch={onSearch} style={{ width: 200 }} />
            </div>

          </Space>
        </Panel>
      </Collapse>
    </div>
  );
};

export default Team;
