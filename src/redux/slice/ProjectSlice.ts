import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { EProjectStatus, IAllProjectResponse, IParamsForAllProject, IProjectQuantity } from '../../interfaces/interface';
import { RootState } from '../store';
import axiosClient from '../../api/axiosClient';

interface IProjectState {
  projectQuantity: {
    isLoading: boolean
    active: number
    deactive: number
    isError: boolean
  }
  allProject: {
    isLoading: boolean
    data: IAllProjectResponse[]
    isError: boolean
  }
}

const initialState: IProjectState = {
  projectQuantity: { isLoading: false, active: 0, deactive: 0, isError: false },
  allProject: {
    isLoading: false,
    data: [],
    isError: false
  }
};

const ProjectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProjectQuantity.pending, (state) => {
        state.projectQuantity.isLoading = true;
      })
      .addCase(getProjectQuantity.fulfilled, (state, action) => {
        state.projectQuantity.isLoading = false;
        state.projectQuantity.isError = false;
        const projectQuantity = {
          active:
            action.payload
              .filter((curentValue) => curentValue.status === EProjectStatus.ACTIVE)
              .reduce((acc, curentValue) => acc + curentValue.quantity, 0),
          deactive:
            action.payload
              .filter((curentValue) => curentValue.status === EProjectStatus.DEACTIVE)
              .reduce((acc, curentValue) => acc + curentValue.quantity, 0)
        };
        state.projectQuantity.active = projectQuantity.active;
        state.projectQuantity.deactive = projectQuantity.deactive;
      })
      .addCase(getProjectQuantity.rejected, (state) => {
        state.projectQuantity.isLoading = false;
        state.projectQuantity.isError = true;
      });
    builder
      .addCase(getAllProject.pending, (state) => {
        state.allProject.isLoading = true;
      })
      .addCase(getAllProject.fulfilled, (state, action) => {
        state.allProject.isLoading = false;
        state.allProject.isError = false;
        state.allProject.data = action.payload;
      })
      .addCase(getAllProject.rejected, (state) => {
        state.allProject.isLoading = false;
        state.allProject.isError = true;
      });
  }
});

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

export const selectProjectStore = (state: RootState): IProjectState => state.project;
export default ProjectSlice;
