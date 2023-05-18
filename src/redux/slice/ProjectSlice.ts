import { PayloadAction, createSlice } from '@reduxjs/toolkit';
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
  searchProject: {
    isLoading: boolean
    search: string
  }
}

const initialState: IProjectState = {
  projectQuantity: { isLoading: false, active: 0, deactive: 0, isError: false },
  allProject: {
    isLoading: false,
    data: [],
    isError: false
  },
  searchProject: { isLoading: false, search: '' }
};

const ProjectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    SearchProject: (state, action: PayloadAction<string>) => {
      state.searchProject.isLoading = true;
      state.searchProject.search = action.payload;
      state.searchProject.isLoading = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProjectQuantity.pending, (state) => {
        state.projectQuantity.isLoading = true;
      })
      .addCase(getProjectQuantity.fulfilled, (state, action) => {
        state.projectQuantity.isLoading = false;
        state.projectQuantity.isError = false;

        const projectQuantity = action.payload.reduce(
          (acc, currentValue): { active: number, deactive: number } => {
            switch (currentValue.status) {
              case EProjectStatus.ACTIVE: {
                return { ...acc, active: currentValue.quantity };
              }
              case EProjectStatus.DEACTIVE: {
                return { ...acc, deactive: currentValue.quantity };
              }
              default: {
                return acc;
              }
            }
          },
          { active: 0, deactive: 0 }
        );
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
export const { SearchProject } = ProjectSlice.actions;
export default ProjectSlice;
