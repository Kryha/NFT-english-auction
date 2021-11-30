import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

import { CompleteStore } from "../types";
import { fullResetAction } from "../common";
import { BidObject, NewBidFormData } from "../../../../types";
import { preview } from "../../utils";

const defaultNewBid: NewBidFormData = {
  amount: 0,
  auctionId: 0,
  auctionName: "",
};

interface CreateBidState {
  formData: NewBidFormData;
  preview: BidObject;
}

const initialState: CreateBidState = {
  formData: defaultNewBid,
  preview: preview.bid(defaultNewBid),
};

const reset = (): CreateBidState => {
  return initialState;
};

export const createBidSlice = createSlice({
  name: "createBid",
  initialState: initialState,
  reducers: {
    setCreateBid: (state, action: PayloadAction<NewBidFormData>) => {
      state.formData = action.payload;
      state.preview = preview.bid(action.payload);
    },
    resetCreateBid: reset,
  },

  extraReducers: (builder) => {
    builder.addCase(fullResetAction, reset);
  },
});

export const useCreateBidState = (): CreateBidState => {
  return useSelector((store: CompleteStore) => store.createBid);
};

export const { setCreateBid, resetCreateBid } = createBidSlice.actions;
export default createBidSlice.reducer;
