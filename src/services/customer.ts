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
