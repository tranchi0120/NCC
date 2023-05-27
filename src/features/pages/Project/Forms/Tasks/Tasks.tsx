import React, { useEffect, useState } from 'react';
import type { FC } from 'react';
import { Table as ATable, Collapse as ACollapse } from 'antd';
import { CloseOutlined, PlusCircleOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

import './Tasks.scss';
import { ITaskResponse } from '../../../../../interfaces/interface';
import tasks from '../../../../../services/Task';

const { Panel: APanel } = ACollapse;

interface IDataType {
  key: React.Key
  task: React.ReactNode
  billable?: boolean
  taskType?: 'Other task' | 'Common task'
}

const columns: ColumnsType<IDataType> = [
  {
    title: 'Tasks',
    dataIndex: 'task',
    key: 'task'
  },
  ATable.SELECTION_COLUMN,
  {
    title: 'Billable',
    dataIndex: 'billable',
    key: 'billable'
  }
];

const columnsTwo: ColumnsType<IDataType> = [
  { title: 'Tasks', dataIndex: 'task', key: 'task' },
  { title: 'Task Type', dataIndex: 'taskType', key: 'taskType' }
];

const data: IDataType[] = [
  {
    key: 1,
    task: (
      <div className='task-name'>
        <CloseOutlined className='close-icon' />
        Hello 1
      </div>
    )
  },
  {
    key: 2,
    task: (
      <div className='task-name'>
        <CloseOutlined className='close-icon' />
        Hello 2
      </div>
    )
  },
  {
    key: 3,
    task: (
      <div className='task-name'>
        <CloseOutlined className='close-icon' />
        Hello 3
      </div>
    )
  }
];

const dataTwo: IDataType[] = [
  {
    key: 4,
    task: (
      <div className='task-name'>
        <PlusCircleOutlined className='add-icon' />
        Xin chao 1
      </div>
    ),
    taskType: 'Other task'
  },
  {
    key: 5,
    task: (
      <div className='task-name'>
        <PlusCircleOutlined className='add-icon' />
        Xinn chao 2
      </div>
    ),
    taskType: 'Other task'
  },
  {
    key: 6,
    task: (
      <div className='task-name'>
        <PlusCircleOutlined className='add-icon' />
        Xin chao 3
      </div>
    ),
    taskType: 'Common task'
  },
  {
    key: 7,
    task: (
      <div className='task-name'>
        <PlusCircleOutlined className='add-icon' />
        Xin chao 4
      </div>
    ),
    taskType: 'Common task'
  },
  {
    key: 8,
    task: (
      <div className='task-name'>
        <PlusCircleOutlined className='add-icon' />
        Xin chao 5
      </div>
    ),
    taskType: 'Common task'
  },
  {
    key: 9,
    task: (
      <div className='task-name'>
        <PlusCircleOutlined className='add-icon' />
        Xin chao 6
      </div>
    ),
    taskType: 'Common task'
  }
];

// handle when select item, make it after
const rowSelection = {
  onChange: (selectedRowKeys: React.Key[], selectedRows: IDataType[]) => {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  }
};

const Tasks: FC = () => {
  const [task, setTask] = useState<ITaskResponse[]>([]);
  console.log(task);
  useEffect(() => {
    const fetchDataTask = async (): Promise<void> => {
      const res = await tasks.getAllTask();
      setTask(res);
    };
    void fetchDataTask();
  }, []);
  return (
    <div className='task-form'>
      <ATable
        className='task-table'
        columns={columns}
        pagination={false}
        rowSelection={rowSelection}
        dataSource={data}
      />
      <ACollapse bordered={false} className='task-collapse'>
        <APanel header='Select task' showArrow={false} key='1'>
          <div className='panel-body'>
            <ATable
              showHeader={false}
              className='task-table'
              columns={columnsTwo}
              pagination={false}
              dataSource={dataTwo}
            />
          </div>
        </APanel>
      </ACollapse>
    </div>
  );
};

export default Tasks;
