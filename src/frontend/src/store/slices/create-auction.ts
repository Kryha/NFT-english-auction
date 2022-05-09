import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

import { CompleteStore } from "../types";
import { fullResetAction } from "../common";
import { NewAuctionFormData, AuctionObject } from "../../../../types";
import { preview } from "../../utils";

const defaultNewAuction: NewAuctionFormData = {
  name: "",
  description: "",
  startPrice: 0,
  minIncrement: 0,
  durationInDays: 0,
  buyNowPrice: 0,
  nftId: BigInt(0),
};

interface CreateAuctionState {
  formData: NewAuctionFormData;
  preview: AuctionObject;
}

const initialState: CreateAuctionState = {
  formData: defaultNewAuction,
  preview: preview.auction(defaultNewAuction),
};

const reset = (): CreateAuctionState => {
  return initialState;
};

export const createAuctionSlice = createSlice({
  name: "createAuction",
  initialState: initialState,
  reducers: {
    setCreateAuction: (state, action: PayloadAction<NewAuctionFormData>) => {
      state.formData = action.payload;
      state.preview = preview.auction(action.payload);
    },
    resetCreateAuction: reset,
  },

  extraReducers: (builder) => {
    builder.addCase(fullResetAction, reset);
  },
});

export const useCreateAuctionState = (): CreateAuctionState => {
  return useSelector((store: CompleteStore) => store.createAuction);
};

export const { setCreateAuction, resetCreateAuction } = createAuctionSlice.actions;
export default createAuctionSlice.reducer;
