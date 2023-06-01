/* eslint-disable @typescript-eslint/no-unused-expressions */

import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IAllProjectResponse, ITask, IUser, IUserNotPagging } from '../../interfaces/interface';
import { RootState } from '../store';
import { CreateProject, DeleteProject, IsDeactive, getAllProject, getProjectQuantity } from '../ThunkFunction/ThunkFunction';
import { EProjectStatus } from '../../enums/enums';

interface INotification {
  isNotifyToKomu: boolean
  komuChannelId: string | undefined
}
interface IProjectState {
  projectStatus: EProjectStatus
  inputSearchProject: string
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
  createProject: {
    isLoading: boolean
    isError: boolean
  }
  projectForm: {
    userSelected: IUserNotPagging[]
    userSelectedToSubmit: IUser[]
    tasksSelected: ITask[]
    notification: INotification
  }
}

const initialState: IProjectState = {
  projectStatus: EProjectStatus.ACTIVE,
  inputSearchProject: '',
  projectQuantity: { isLoading: false, active: 0, deactive: 0, isError: false },
  allProject: {
    isLoading: false,
    data: [],
    isError: false
  },
  createProject: {
    isLoading: false,
    isError: false
  },
  projectForm: {
    userSelected: [],
    tasksSelected: [],
    userSelectedToSubmit: [],
    notification: {
      isNotifyToKomu: false,
      komuChannelId: undefined
    }
  }
};

const ProjectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    // selected member for project
    adduserSelected: (state, action: PayloadAction<IUserNotPagging>) => {
      state.projectForm.userSelected.push(action.payload);
    },
    removeUserSelected: (state, action: PayloadAction<number>) => {
      state.projectForm.userSelected = state.projectForm.userSelected.filter(
        (user) => user.id !== action.payload
      );
    },
    deleteUserSelected: (state) => {
      state.projectForm.userSelected = [];
      state.projectForm.userSelectedToSubmit = [];
    },
    // selected tasks for project
    addSelectedtask: (state, action: PayloadAction<ITask[]>) => {
      state.projectForm.tasksSelected = action.payload;
    },
    // chose userPosition
    addUserPosition: (state, action: PayloadAction<IUser>) => {
      state.projectForm.userSelectedToSubmit.push(action.payload);
    },
    removeUserPosition: (state, action: PayloadAction<number>) => {
      state.projectForm.userSelectedToSubmit = state.projectForm.userSelectedToSubmit.filter(
        user => user.userId !== action.payload
      );
    },
    UpdateUserPosition: (state, action: PayloadAction<IUser>) => {
      const userPositionUpdateIndex = state.projectForm.userSelectedToSubmit.findIndex(
        (item) => item.userId === action.payload.userId
      );
      state.projectForm.userSelectedToSubmit[userPositionUpdateIndex] = action.payload;
    },
    // taskForm using isNotifyToKomu
    CheckNotifyToKomu: (state, action: PayloadAction<boolean>) => {
      state.projectForm.notification.isNotifyToKomu = action.payload;
    },
    UpdateNotifyToKomu: (state, action: PayloadAction<string>) => {
      state.projectForm.notification.komuChannelId = action.payload;
    },
    DeleteProjectItem: (state, action: PayloadAction<number>) => {
      state.allProject.isLoading = false;
      state.allProject.data = state.allProject.data.filter(project => project.id !== action.payload);
    }

  },
  extraReducers: (builder) => {
    // get project quantity
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
    // get all project
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
    // create project
    builder
      .addCase(CreateProject.pending, (state) => {
        state.createProject.isLoading = true;
      })
      .addCase(CreateProject.fulfilled, (state) => {
        state.createProject.isLoading = false;
      })
      .addCase(CreateProject.rejected, (state) => {
        state.createProject.isLoading = false;
        state.createProject.isError = true;
      });
    // delete project
    builder
      .addCase(DeleteProject.pending, (state) => {
        state.allProject.isLoading = true;
      })
      .addCase(DeleteProject.fulfilled, (state, action) => {
        state.allProject.isLoading = false;
        state.allProject.data = state.allProject.data.filter(project => project.id !== action.payload);
      })
      .addCase(DeleteProject.rejected, (state) => {
        state.allProject.isLoading = false;
        state.allProject.isError = true;
      });
    builder
      // IsDeactive or active
      .addCase(IsDeactive.pending, (state) => {
        state.allProject.isLoading = true;
      })
      .addCase(IsDeactive.fulfilled, (state, action) => {
        state.allProject.isLoading = false;
        const index = state.allProject.data.findIndex(item => item.id === action.payload);
        const item = state.allProject.data[index];
        if (index !== -1) {
          item.status = EProjectStatus.DEACTIVE;
        }
      })
      .addCase(IsDeactive.rejected, (state) => {
        state.allProject.isLoading = false;
        state.allProject.isError = true;
      });
  }
});

export const {
  removeUserPosition,
  addUserPosition,
  addSelectedtask,
  deleteUserSelected,
  removeUserSelected,
  adduserSelected,
  CheckNotifyToKomu,
  UpdateNotifyToKomu,
  UpdateUserPosition,
  DeleteProjectItem
} = ProjectSlice.actions;
export const selectProjectStore = (state: RootState): IProjectState => state.project;
export default ProjectSlice;
