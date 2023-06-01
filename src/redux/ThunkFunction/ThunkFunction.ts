import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from '../../api/axiosClient';
import { IAllProjectResponse, IParamsForAllProject, IProjectQuantity, IProjectSubmitValue } from '../../interfaces/interface';
import { EProjectStatus } from '../../enums/enums';

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

export const DeleteProject = createAsyncThunk('project/deleteProject', async (projectId: number) => {
  await axiosClient.delete(`/api/services/app/Project/Delete?Id=${projectId}`);
  return projectId;
});

export const IsDeactive = createAsyncThunk('project/isDeactive', async (projectId: number) => {
  await axiosClient.post('/api/services/app/Project/Inactive', { projectId });
  return projectId;
});
