import { TokenObject } from "../../../../types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { CompleteStore } from "../types";
import { fullResetAction } from "../common";

export type WalletState = {
  nft: NFTWallet;
  totalTokenValue: number;
};
export type NFTWallet = {
  tokens: TokenObject[];
  fetched: boolean;
};
const initialState: WalletState = {
  nft: {
    tokens: [],
    fetched: false,
  },
  totalTokenValue: 0,
};

const reset = (): WalletState => {
  return initialState;
};

export const walletSlice = createSlice({
  name: "wallet",
  initialState: initialState,
  reducers: {
    setNFTWallet: (state, action: PayloadAction<NFTWallet>): void => {
      const { payload } = action;
      state.nft = payload;
      state.totalTokenValue = payload.tokens.length;
    },
    addToNFTWallet: (state, action: PayloadAction<TokenObject[]>) => {
      state.nft.tokens.push(...action.payload);
      state.totalTokenValue = state.nft.tokens.length;
      state.nft.fetched = true;
    },
    resetWallet: reset,
  },
  extraReducers: (builder) => {
    builder.addCase(fullResetAction, reset);
  },
});

const walletNFTSelector = (store: CompleteStore): NFTWallet => {
  return store.wallet.nft;
};

const fullWalletSelector = (store: CompleteStore): WalletState => {
  return store.wallet;
};

export const useNFTWallet = (): NFTWallet => {
  return useSelector(walletNFTSelector);
};

export const useWalletValues = (): [number, NFTWallet] => {
  const wallet = useSelector(fullWalletSelector);
  return [wallet.totalTokenValue, wallet.nft];
};

export const { setNFTWallet, resetWallet, addToNFTWallet } = walletSlice.actions;
export default walletSlice.reducer;
