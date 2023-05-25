import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IBranch } from '../../interfaces/interface';
import axiosClient from '../../api/axiosClient';
import { RootState } from '../store';

interface IBranchState {
  isLoading: boolean
  isError: string
  branchItem: IBranch[]
}

const initialState: IBranchState = {
  isLoading: false,
  isError: '',
  branchItem: []
};

const BranchSlice = createSlice({
  name: 'branch',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetAllBranchFilter.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(GetAllBranchFilter.fulfilled, (state, action) => {
        state.isLoading = false;
        state.branchItem = action.payload;
        state.isError = '';
      })
      .addCase(GetAllBranchFilter.rejected, (state) => {
        state.isLoading = false;
        state.isError = 'Fail to fetch GetAllBranchFilter data!';
      });
  }
});

export const GetAllBranchFilter = createAsyncThunk(
  'branchFilter/GetAllBranchFilter', async () => {
    const res: IBranch[] = await axiosClient.get('/api/services/app/Branch/GetAllBranchFilter?isAll=true');
    return res;
  });

export const selectBranchStore = (state: RootState): IBranchState => state.branch;
export default BranchSlice;
