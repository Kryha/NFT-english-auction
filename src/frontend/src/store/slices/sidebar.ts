import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { CompleteStore } from "../types";

export type SidebarState = {
  collapsedSidebar: boolean;
};

const initialState: SidebarState = {
  collapsedSidebar: false,
};

export const sidebarStateSlice = createSlice({
  name: "sidebarState",
  initialState: initialState,
  reducers: {
    updateSidebar: (state, action: PayloadAction<boolean>): void => {
      state.collapsedSidebar = action.payload;
    },
  },
});

const sidebarStateSelector = (store: CompleteStore): boolean => {
  return store.sidebarState.collapsedSidebar;
};

export const useSidebarState = (): boolean => {
  return useSelector(sidebarStateSelector);
};

export const { updateSidebar } = sidebarStateSlice.actions;
export default sidebarStateSlice.reducer;
