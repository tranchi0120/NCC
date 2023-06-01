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
