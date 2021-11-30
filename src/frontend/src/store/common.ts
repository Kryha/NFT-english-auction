import { useDispatch } from "react-redux";
import { createAction } from "@reduxjs/toolkit";

export const fullResetAction = createAction("FULL_RESET");

export const useFullStoreReset = (): (() => void) => {
  const dispatch = useDispatch();
  return (): void => {
    dispatch(fullResetAction());
  };
};
