import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

import { CompleteStore, fullResetAction } from "../";
import { AuctionObject, AuctionState as Auction, BiddedAuctionState, BidObject } from "../../../../types";

interface AuctionState {
  auctions: Record<number, Auction>;
  biddedAuctions: Record<number, BiddedAuctionState>;
  ownAuctions: Record<number, AuctionObject>;
  fetchedAll: boolean;
  fetchedBidded: boolean;
  fetchedOwn: boolean;
}

const initialState: AuctionState = {
  auctions: {},
  ownAuctions: {},
  biddedAuctions: {},
  fetchedAll: false,
  fetchedBidded: false,
  fetchedOwn: false,
};

const reset = (): AuctionState => {
  return initialState;
};

export const auctionSlice = createSlice({
  name: "auction",
  initialState: initialState,
  reducers: {
    addAuctions: (state, action: PayloadAction<Auction[]>) => {
      action.payload.forEach((auction) => {
        state.auctions[auction.auction.id] = auction;
      });
    },
    addOwnAuctions: (state, { payload }: PayloadAction<AuctionObject[]>) => {
      payload.forEach((auction) => {
        state.ownAuctions[auction.id] = auction;
      });
    },
    addBiddedAuctions: (state, action: PayloadAction<BiddedAuctionState[]>) => {
      action.payload.forEach((auction) => {
        state.auctions[auction.auction.id] = auction;
        state.biddedAuctions[auction.auction.id] = auction;
      });
    },
    setHighestBid: (state, action: PayloadAction<BidObject>) => {
      const { payload } = action;
      if (!state.auctions[payload.auctionId]) return;
      state.auctions[payload.auctionId].highestBid = payload;
      state.auctions[payload.auctionId].bidIds.push(payload.id);

      if (state.biddedAuctions[payload.auctionId]) {
        state.biddedAuctions[payload.auctionId].highestBid = payload;
        state.biddedAuctions[payload.auctionId].bidIds.push(payload.id);
      } else {
        state.biddedAuctions[payload.auctionId] = { ...state.auctions[payload.auctionId], userBid: payload };
      }
    },
    setFetchedAll: (state, action: PayloadAction<boolean>) => {
      state.fetchedAll = action.payload;
    },
    setFetchedBidded: (state, action: PayloadAction<boolean>) => {
      state.fetchedBidded = action.payload;
    },
    setFetchedOwn: (state, action: PayloadAction<boolean>) => {
      state.fetchedOwn = action.payload;
    },
    resetAuctions: reset,
  },
  extraReducers: (builder) => {
    builder.addCase(fullResetAction, reset);
  },
});

export const useAuctionsState = (): AuctionState => {
  return useSelector((store: CompleteStore) => store.auctions);
};

export const {
  addAuctions,
  addBiddedAuctions,
  addOwnAuctions,
  setHighestBid,
  setFetchedAll,
  setFetchedBidded,
  setFetchedOwn,
  resetAuctions,
} = auctionSlice.actions;
export default auctionSlice.reducer;
