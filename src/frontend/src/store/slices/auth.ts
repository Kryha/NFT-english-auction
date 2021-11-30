import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

import { CompleteStore } from "../types";

export interface AuthState {
  initialized: boolean;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  initialized: false,
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    initAuthClient: (state, action: PayloadAction<boolean>): void => {
      state.initialized = true;
      state.isAuthenticated = action.payload;
    },
    login: (state): void => {
      state.isAuthenticated = true;
    },
    logout: (state): void => {
      state.isAuthenticated = false;
    },
  },
});

export const useAuthState = (): AuthState => {
  return useSelector((store: CompleteStore) => store.auth);
};

export const { login, logout, initAuthClient } = authSlice.actions;
export default authSlice.reducer;
