import { AxiosResponse } from 'axios';
import axiosClient from '../api/axiosClient';
import { ICustomerResponse, ITaskResponse } from '../interfaces/interface';

const services = {
  getAllClient: async () => {
    const response: ICustomerResponse[] = await axiosClient.get(
      '/api/services/app/Customer/GetAll'
    );
    return response;
  },
  getAllTask: async () => {
    const res: ITaskResponse[] = await axiosClient.get(
      '/api/services/app/Task/GetAll');
    return res;
  }
};
export default services;

export const activeProject = async (id: number): Promise<AxiosResponse> => {
  return await axiosClient.post('/api/services/app/Project/Active', { id });
};

export const inActiveProject = async (id: number): Promise<AxiosResponse> => {
  return await axiosClient.post('/api/services/app/Project/Inactive', { id });
};
