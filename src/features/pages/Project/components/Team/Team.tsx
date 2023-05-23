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
                  {
                    value: '1',
                    label: 'All'
                  },
                  {
                    value: '2',
                    label: 'Closed'
                  },
                  {
                    value: '3',
                    label: 'Communicated'
                  },
                  {
                    value: '4',
                    label: 'Identified'
                  },
                  {
                    value: '5',
                    label: 'Resolved'
                  },
                  {
                    value: '6',
                    label: 'Cancelled'
                  }
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
                  {
                    value: '1',
                    label: 'All'
                  },
                  {
                    value: '2',
                    label: 'Closed'
                  },
                  {
                    value: '3',
                    label: 'Communicated'
                  },
                  {
                    value: '4',
                    label: 'Identified'
                  },
                  {
                    value: '5',
                    label: 'Resolved'
                  },
                  {
                    value: '6',
                    label: 'Cancelled'
                  }
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
