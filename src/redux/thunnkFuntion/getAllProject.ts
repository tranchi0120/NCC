import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from '../../api/axiosClient';
import { EProjectStatus, IAllProjectResponse, IParamsForAllProject } from '../../interfaces/interface';

const getAllProject = createAsyncThunk('project/getallProject', async (data: IParamsForAllProject) => {
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

export default getAllProject;
