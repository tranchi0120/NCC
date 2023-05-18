import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { EProjectActionName } from '../../interfaces/interface';

interface IProjectActionsState {
  isModalOpen: boolean
  modalTitle: string
  action: EProjectActionName
  erorr: string
}

const initialState: IProjectActionsState = {
  isModalOpen: false,
  modalTitle: '',
  erorr: '',
  action: EProjectActionName.CREATE
};

export interface IModalAction {
  action: EProjectActionName
  title: string
}

const projectActionsSlice = createSlice({
  name: 'projectActions',
  initialState,
  reducers: {
    modalOpen: (state, action: PayloadAction<IModalAction>) => {
      state.isModalOpen = true;
      state.erorr = '';
      state.action = action.payload.action;
      state.modalTitle = action.payload.title;
    },
    modalClose: (state) => {
      state.isModalOpen = false;
      state.erorr = '';
    }
  }
});

export const { modalOpen, modalClose } = projectActionsSlice.actions;

export const selectProjectActionsStore = (state: RootState): IProjectActionsState =>
  state.projectActions;

export default projectActionsSlice;
