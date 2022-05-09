import { addDays } from "date-fns";

import { AuctionStatus, NewTokenFormData, TokenObject, AuctionObject, BidObject, NewAuctionFormData, NewBidFormData } from "../../../types";
import { MOCK_OWNER } from "../assets";

export const preview = {
  auction: (formData: NewAuctionFormData): AuctionObject => ({
    ...formData,
    id: 0,
    status: AuctionStatus.Pending,
    dateCreated: Date.now(),
    owner: MOCK_OWNER,
    deadline: addDays(Date.now(), Number(formData.durationInDays)).getTime(),
    nftId: BigInt(0),
  }),
  bid: (formData: NewBidFormData): BidObject => ({
    ...formData,
    id: 0,
    bidDate: Date.now(),
    confirmed: false,
    bidder: MOCK_OWNER,
  }),
  nft: (formData: NewTokenFormData): TokenObject => ({
    ...formData,
    owner: MOCK_OWNER,
    tokenId: 0,
  }),
};
