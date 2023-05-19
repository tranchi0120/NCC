import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface ISidebarState {
  isShowSidebar: boolean
}

const initialState: ISidebarState = {
  isShowSidebar: false
};

const SidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isShowSidebar = !state.isShowSidebar;
    }
  }
});

export const { toggleSidebar } = SidebarSlice.actions;

export const selectSidebarStore = (state: RootState): ISidebarState => state.sidebar;

export default SidebarSlice;
