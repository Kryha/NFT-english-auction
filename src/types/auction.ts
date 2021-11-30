import { AuctionObject as AuctionObjectBackend, NewAuctionPayload as NewAuctionPayloadBackend } from "../declarations/backend/backend.did";
import { BidObject } from "./bid";
import { Timestamp } from "./common";

export enum AuctionStatus {
  Pending = "pending",
  Active = "active",
  Closed = "closed",
}

export interface AuctionObject extends Omit<AuctionObjectBackend, "status" | "durationInDays" | "dateCreated" | "id" | "owner"> {
  id: number;
  status: AuctionStatus;
  deadline: Timestamp;
  durationInDays: number;
  dateCreated: Timestamp;
  owner: string;
}

export interface AuctionState {
  highestBid?: BidObject;
  auction: AuctionObject;
  bidIds: number[];
}

export interface BiddedAuctionState extends AuctionState {
  userBid: BidObject;
}

export interface NewAuctionFormData extends Omit<NewAuctionPayloadBackend, "durationInDays"> {
  durationInDays: number;
}
