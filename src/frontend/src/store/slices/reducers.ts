import { combineReducers } from "@reduxjs/toolkit";
import auctions from "./auction";
import createAuction from "./create-auction";
import createBid from "./create-bid";
import sidebarState from "./sidebar";
import wallet from "./wallet";
import auth from "./auth";
import createToken from "./create-token";

export const combinedReducers = combineReducers({
  auctions,
  createAuction,
  createBid,
  sidebarState,
  wallet,
  createToken,
  auth,
});
