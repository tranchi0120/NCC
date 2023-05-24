import axiosClient from '../api/axiosClient';
import { ICustomerResponse } from '../interfaces/interface';

const customer = {
  getAllClient: async () => {
    const response: ICustomerResponse[] = await axiosClient.get(
      '/api/services/app/Customer/GetAll'
    );
    console.log({ response });
    return response;
  }
};

export default customer;
