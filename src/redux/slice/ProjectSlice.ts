
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { EProjectStatus, IAllProjectResponse, IParamsForAllProject, IProjectQuantity, IProjectSubmitValue, ITask, IUser, IUserNotPagging } from '../../interfaces/interface';
import { RootState } from '../store';
import axiosClient from '../../api/axiosClient';

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
      .addCase(CreateProject.fulfilled, (state, action) => {
        state.createProject.isLoading = false;
      })
      .addCase(CreateProject.rejected, (state) => {
        state.createProject.isLoading = false;
        state.createProject.isError = true;
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

export const CreateProject = createAsyncThunk('project/createProject', async (ProjectData: IProjectSubmitValue) => {
  await axiosClient.post('/api/services/app/Project/Save', ProjectData);
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
  UpdateUserPosition
} = ProjectSlice.actions;
export const selectProjectStore = (state: RootState): IProjectState => state.project;
export default ProjectSlice;
