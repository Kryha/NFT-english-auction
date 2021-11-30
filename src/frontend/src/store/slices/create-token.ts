import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

import { CompleteStore } from "../types";
import { fullResetAction } from "../common";
import { TokenObject, NewTokenFormData, NFTCategory, NullNftId } from "../../../../types";
import { preview } from "../../utils";

const defaultNewToken: NewTokenFormData = {
  file: { data: new ArrayBuffer(8), type: "", name: "" },
  title: "",
  link: "",
  description: "",
  category: NFTCategory.Other,
  nftId: NullNftId,
};

interface CreateTokenState {
  formData: NewTokenFormData;
  preview: TokenObject;
}

const initialState: CreateTokenState = {
  formData: defaultNewToken,
  preview: preview.nft(defaultNewToken),
};

const reset = (): CreateTokenState => {
  return initialState;
};

export const createTokenSlice = createSlice({
  name: "createToken",
  initialState: initialState,
  reducers: {
    changeTokenInput: (state, action: PayloadAction<NewTokenFormData>) => {
      state.formData = action.payload;
      state.preview = preview.nft(action.payload);
    },
    resetTokenInputs: reset,
  },

  extraReducers: (builder) => {
    builder.addCase(fullResetAction, reset);
  },
});

export const useCreateTokenState = (): CreateTokenState => {
  return useSelector((store: CompleteStore) => store.createToken);
};

export const { changeTokenInput, resetTokenInputs } = createTokenSlice.actions;
export default createTokenSlice.reducer;
