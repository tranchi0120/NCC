import axiosClient from '../api/axiosClient';
import { ICustomerResponse } from '../interfaces/interface';

const customer = {
  getAllClient: async () => {
    const response: ICustomerResponse[] = await axiosClient.get(
      '/api/services/app/Customer/GetAll'
    );
    return response;
  }
};

export default customer;

export const deleteProject = {
  DeleteProject: async (projectId: number) => {
    return await axiosClient.delete(`/api/services/app/Project/Delete?Id=${projectId}`);
  }
};
