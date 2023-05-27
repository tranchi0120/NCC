/* eslint-disable @typescript-eslint/explicit-function-return-type */
import axiosClient from '../api/axiosClient';
import { ITaskResponse } from '../interfaces/interface';

const tasks = {
  getAllTask: async () => {
    const res: ITaskResponse[] = await axiosClient.get(
      '/api/services/app/Task/GetAll');
    console.log('resAllTask:', res);
    return res;
  }
};
export default tasks;
