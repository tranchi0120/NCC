import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from '../../api/axiosClient';
import { IProjectQuantity } from '../../interfaces/interface';

const getProjectQuantity = createAsyncThunk('project/projectQuantitty', async () => {
  const response: IProjectQuantity[] = await axiosClient.get(
    '/api/services/app/Project/GetQuantityProject'
  );
  return response;
});
export default getProjectQuantity;
