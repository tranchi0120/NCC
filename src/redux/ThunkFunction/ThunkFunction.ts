import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from '../../api/axiosClient';
import { EProjectStatus, IAllProjectResponse, IParamsForAllProject, IProjectQuantity, IProjectSubmitValue } from '../../interfaces/interface';

export const getAllProject = createAsyncThunk('project/getallProject', async (data: IParamsForAllProject) => {
  const params =
    data.status === EProjectStatus.ALL
      ? { search: data.searchValue }
      : { status: data.status, search: data.searchValue };

  const response: IAllProjectResponse[] = await axiosClient.get(
    '/api/services/app/Project/GetAll',
    { params }
  );
  return response;
});

export const getProjectQuantity = createAsyncThunk('project/projectQuantitty', async () => {
  const response: IProjectQuantity[] = await axiosClient.get(
    '/api/services/app/Project/GetQuantityProject'
  );
  return response;
});

export const CreateProject = createAsyncThunk('project/createProject', async (ProjectData: IProjectSubmitValue) => {
  await axiosClient.post('/api/services/app/Project/Save', ProjectData);
});
