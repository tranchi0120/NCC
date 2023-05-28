import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosClient from '../../api/axiosClient';
import { IUserNotPagging } from '../../interfaces/interface';
import { RootState } from '../store';

interface IUserNotPaggingState {
  isLoading: boolean
  isError: string
  userNotPaggingList: IUserNotPagging[]
}

const initialState: IUserNotPaggingState = {
  isLoading: false,
  isError: '',
  userNotPaggingList: []
};

const MemberSlice = createSlice({
  name: 'member',
  initialState,
  reducers: {
    filterMembers: (state, action) => {
      const filterList = state.userNotPaggingList.filter((member) => member.type === action.payload.type);
      state.userNotPaggingList = filterList;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserNothing.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserNothing.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = '';
        state.userNotPaggingList = action.payload;
      })
      .addCase(getUserNothing.rejected, (state) => {
        state.isLoading = false;
        state.isError = 'Fail to fetch userNotPagging data!';
      });
  }
});

export const getUserNothing = createAsyncThunk('member/GetUserNotPagging', async () => {
  const res: IUserNotPagging[] = await axiosClient.get(
    '/api/services/app/User/GetUserNotPagging'
  );
  return res;
});

export const selectMemberStore = (state: RootState): IUserNotPaggingState => state.member;
export default MemberSlice;
