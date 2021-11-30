import { BidObject as BidObjectBackend, NewBidPayload } from "../declarations/backend/backend.did";
import { Timestamp } from ".";

export interface BidObject extends Omit<BidObjectBackend, "bidDate" | "id" | "bidder" | "auctionId"> {
  id: number;
  auctionId: number;
  bidDate: Timestamp;
  bidder: string;
}

export interface NewBidFormData extends Omit<NewBidPayload, "auctionId"> {
  auctionId: number;
  auctionName: string;
}
