/* eslint-disable @typescript-eslint/explicit-function-return-type */
import axiosClient from '../api/axiosClient';
import { ITaskResponse } from '../interfaces/interface';

const taskAll = {
  getAllTask: async () => {
    const res: ITaskResponse[] = await axiosClient.get(
      '/api/services/app/Task/GetAll');
    return res;
  }
};
export default taskAll;
