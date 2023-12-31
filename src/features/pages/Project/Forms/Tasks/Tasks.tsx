import React, { useCallback, useEffect, useMemo, useState } from 'react';
import type { FC } from 'react';
import { Table as ATable, Collapse as ACollapse } from 'antd';
import { CloseOutlined, PlusCircleOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

import './Tasks.scss';
import { ITaskResponse } from '../../../../../interfaces/interface';
import { addSelectedtask } from '../../../../../redux/slice/ProjectSlice';
import { useAppDispatch } from '../../../../../redux/hooks';
import services from '../../../../../services/services';

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

  const dispatch = useAppDispatch();

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

  const handleRemoveTask = useCallback(
    (taskId: number): void => {
      const [taskItem] = tasks.filter((task) => task.id === taskId);
      setTaskCanAdd((prev) => [taskItem, ...prev]);
      setTaskSelected((prev) => prev.filter((item) => item.id !== taskId));
    },
    [tasks]
  );

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
      setTaskSelected((prev) => [taskItem, ...prev]);
      setTaskCanAdd((prev) => prev.filter((item) => item.id !== taskId));
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
    const startIndex = 0;
    setTaskSelected(tasks.slice(startIndex, Math.floor((tasks.length * 5) / 10)));
    setTaskCanAdd(tasks.slice(Math.floor((tasks.length * 9) / 10)));
  }, [tasks]);

  useEffect(() => {
    setBillable(taskSelected.map((item) => item.id));
  }, [taskSelected]);

  useEffect(() => {
    const tasksConvert = taskSelected.map((task) => {
      return { taskId: task.id, billable: billable.some((item) => item === task.id) };
    });

    dispatch(addSelectedtask(tasksConvert));
  }, [taskSelected, billable]);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const taskData = await services.getAllTask();

      setTasks(taskData);
      const taskConvert = taskData
        .slice(0, Math.floor((taskData.length * 5) / 10))
        .map((item) => ({ taskId: item.id, billable: true }));
      dispatch(addSelectedtask(taskConvert));
    };

    void fetchData();
  }, []);

  return (
    <div className='task-form'>
      <ATable
        className='task-table'
        columns={columns}
        pagination={{ pageSize: 10, hideOnSinglePage: true, showSizeChanger: false }}
        rowSelection={rowSelection}
        dataSource={taskSelectedTable}
      />
      <ACollapse bordered={false} defaultActiveKey={['1']} className='task-collapse'>
        <APanel header='Select task' showArrow={false} key='1'>
          <ATable
            showHeader={false}
            className='task-table'
            pagination={{ pageSize: 10, hideOnSinglePage: true, showSizeChanger: false }}
            columns={columnsTwo}
            dataSource={taskCanAddTable}
          />
        </APanel>
      </ACollapse>
    </div>
  );
};

export default Tasks;
