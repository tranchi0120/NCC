import React, { useCallback, useEffect, useMemo, useState } from 'react';
import type { FC } from 'react';
import { Table as ATable, Collapse as ACollapse } from 'antd';
import { CloseOutlined, PlusCircleOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

import './Tasks.scss';
import { ITaskResponse } from '../../../../../interfaces/interface';
import taskAll from '../../../../../services/Task';

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

const Tasks: FC = () => {
  const [tasks, setTasks] = useState<ITaskResponse[]>([]);
  const [taskSelected, setTaskSelected] = useState<ITaskResponse[]>([]);
  const [taskCanAdd, setTaskCanAdd] = useState<ITaskResponse[]>([]);
  const [billable, setBillable] = useState<React.Key[]>([]);

  console.log('taskSelected:', taskSelected);
  console.log('taskCanAdd:', taskCanAdd);

  const taskSelectedTable: IDataType[] = useMemo(() => {
    return taskSelected.map((task) => ({
      key: task.id,
      task: (
        <div className='task-name'>
          <CloseOutlined className='close-icon' onClick={() => handleRemoveTask(task.id)} />
          {task.name}
        </div>
      )
    }));
  }, [taskSelected]);

  const taskCanAddTable: IDataType[] = useMemo(() => {
    return taskCanAdd.map((task) => ({
      key: task.id,
      task: (
        <div className='task-name' onClick={() => handleSelectedTask(task.id)}>
          <PlusCircleOutlined className='add-icon' />
          {task.name}
        </div>
      ),
      taskType: task.type === 0 ? 'Other task' : 'Common task'
    }));
  }, [taskCanAdd]);

  const handleSelectedTask = useCallback(
    (taskId: number): void => {
      const [taskItem] = tasks.filter((task) => task.id === taskId);
      setTaskSelected((prev) => [...prev, taskItem]);
      setTaskCanAdd((prev) => prev.filter((item) => item.id !== taskId));
    },
    [tasks]
  );

  const handleRemoveTask = useCallback(
    (taskId: number): void => {
      const [taskItem] = tasks.filter((task) => task.id === taskId);
      setTaskCanAdd((prev) => [...prev, taskItem]);
      setTaskSelected((prev) => prev.filter((item) => item.id !== taskId));
    },
    [tasks]
  );

  const rowSelection = useMemo(() => {
    return {
      onChange: (selectedRowKeys: React.Key[]) => {
        setBillable(selectedRowKeys);
      },
      selectedRowKeys: billable
    };
  }, [billable]);

  useEffect(() => {
    setTaskSelected(tasks.slice(0, Math.floor((tasks.length * 9) / 10)));
    setTaskCanAdd(tasks.slice(Math.floor((tasks.length * 9) / 10)));
  }, [tasks]);

  const data = tasks.slice(0, Math.floor((tasks.length * 5) / 10));
  console.log('data', data);

  useEffect(() => {
    setBillable(taskSelected.map((item) => item.id));
  }, [taskSelected]);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const taskData = await taskAll.getAllTask();

      setTasks(taskData);
    };

    void fetchData();
  }, []);

  return (
    <div className='task-form'>
      <ATable
        className='task-table'
        columns={columns}
        pagination={false}
        rowSelection={rowSelection}
        dataSource={taskSelectedTable}
      />
      <ACollapse bordered={false} className='task-collapse'>
        <APanel header='Select task' showArrow={false} key='1'>
          <div className='panel-body'>
            <ATable
              showHeader={false}
              className='task-table'
              columns={columnsTwo}
              pagination={false}
              dataSource={taskCanAddTable}
            />
          </div>
        </APanel>
      </ACollapse>
    </div>
  );
};

export default Tasks;
