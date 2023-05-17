import { createSlice } from '@reduxjs/toolkit';
import getProjectQuantity from '../thunnkFuntion/getQuantityProject';
import { EProjectStatus, IAllProjectResponse } from '../../interfaces/interface';
import { RootState } from '../store';
import getAllProject from '../thunnkFuntion/getAllProject';

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
          active: action.payload
            .filter(project => project.status === EProjectStatus.ACTIVE)
            .reduce((acc, project) => acc + project.quantity, 0),
          deactive: action.payload
            .filter(project => project.status === EProjectStatus.DEACTIVE)
            .reduce((acc, project) => acc + project.quantity, 0)
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
export const selectProjectStore = (state: RootState): IProjectState => state.project;
export default ProjectSlice.reducer;
