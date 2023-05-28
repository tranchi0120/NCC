import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ITaskResponse } from '../../interfaces/interface';
import axiosClient from '../../api/axiosClient';
import { RootState } from '../store';

interface ItaskState {
  isLoading: boolean
  isError: string
  taskListItem: ITaskResponse[]
}

const initialState: ItaskState = {
  isLoading: false,
  isError: '',
  taskListItem: []
};

const TaskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.taskListItem = action.payload;
      })
      .addCase(getAllTask.rejected, (state) => {
        state.isLoading = false;
        state.isError = 'Can not get data';
      });
  }
});

export const getAllTask = createAsyncThunk('tasks/getAllTask', async () => {
  const res: ITaskResponse[] = await axiosClient.get(
    '/api/services/app/Task/GetAll');
  return res;
});

export const selectTasksStore = (state: RootState): ItaskState => state.tasks;
export default TaskSlice;
