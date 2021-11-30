// This file contains functions that are used when going from a backend type to a frontend type

import { Principal } from "@dfinity/principal";
import { NANO_IN_MILLI } from "../assets/util";
import {
  AuctionObject as AuctionObjectBackend,
  AuctionState as AuctionStateBackend,
  AuctionStatus as AuctionStatusBackend,
  BiddedAuctionState as BiddedAuctionStateBackend,
  BidObject as BidObjectBackend,
  NewAuctionPayload,
  NewBidPayload,
  Timestamp as TimestampBackend,
} from "../../../declarations/backend/backend.did";
import {
  AuctionObject,
  AuctionState,
  AuctionStatus,
  BiddedAuctionState,
  BidObject,
  NewAuctionFormData,
  NewBidFormData,
  Timestamp,
} from "../../../types";
import { addDays } from "date-fns";

const backToFront = {
  auctionStatus: (backendStatus: AuctionStatusBackend): AuctionStatus => {
    if (AuctionStatus.Active in backendStatus) return AuctionStatus.Active;
    if (AuctionStatus.Closed in backendStatus) return AuctionStatus.Closed;
    return AuctionStatus.Pending;
  },
  auctionDeadline: (dateCreated: TimestampBackend, durationInDays: bigint): number => {
    const frontendTs = backToFront.timestamp(dateCreated);
    return addDays(frontendTs, Number(durationInDays)).getTime();
  },
  timestamp: (backendTimestamp: TimestampBackend): Timestamp => {
    const timestampMs = backendTimestamp / BigInt(NANO_IN_MILLI);
    return Math.floor(Number(timestampMs));
  },
  bigInt2Number: (bigint: bigint): number => Number(bigint),
  bigInt2String: (bigint: bigint): string => Number(bigint).toString(),
  principal2String: (principal: Principal): string => principal.toString(),
};

const frontToback = {
  auctionStatus: (backendStatus: AuctionStatus): AuctionStatusBackend => {
    return { [backendStatus]: null } as AuctionStatusBackend;
  },
  timestamp: (frontendTimestamp: Timestamp): TimestampBackend => {
    const timestampMs = frontendTimestamp * NANO_IN_MILLI;
    return BigInt(timestampMs);
  },
  number2BigInt: (value: number): bigint => BigInt(value),
  string2Principal: (principal: string): Principal => Principal.from(principal),
};

export const mediate = {
  toFront: {
    auctionObject: (backendAuction: AuctionObjectBackend): AuctionObject => ({
      ...backendAuction,
      dateCreated: backToFront.timestamp(backendAuction.dateCreated),
      durationInDays: backToFront.bigInt2Number(backendAuction.durationInDays),
      status: backToFront.auctionStatus(backendAuction.status),
      id: backToFront.bigInt2Number(backendAuction.id),
      owner: backToFront.principal2String(backendAuction.owner),
      deadline: backToFront.auctionDeadline(backendAuction.dateCreated, backendAuction.durationInDays),
    }),
    auctionState: (auction: AuctionStateBackend): AuctionState => ({
      auction: mediate.toFront.auctionObject(auction.auction),
      highestBid: auction.highestBid[0] ? mediate.toFront.bidObject(auction.highestBid[0]) : undefined,
      bidIds: auction.bidIds.map((id) => backToFront.bigInt2Number(id)),
    }),
    biddedAuctionState: (auction: BiddedAuctionStateBackend): BiddedAuctionState => ({
      auction: mediate.toFront.auctionObject(auction.auction),
      highestBid: auction.highestBid[0] ? mediate.toFront.bidObject(auction.highestBid[0]) : undefined,
      userBid: mediate.toFront.bidObject(auction.userBid),
      bidIds: auction.bidIds.map((id) => backToFront.bigInt2Number(id)),
    }),
    bidObject: (backendBid: BidObjectBackend): BidObject => ({
      ...backendBid,
      bidDate: backToFront.timestamp(backendBid.bidDate),
      id: backToFront.bigInt2Number(backendBid.id),
      bidder: backToFront.principal2String(backendBid.bidder),
      auctionId: backToFront.bigInt2Number(backendBid.auctionId),
    }),
  },
  toBack: {
    newAuctionPayload: (formData: NewAuctionFormData): NewAuctionPayload => ({
      ...formData,
      durationInDays: frontToback.number2BigInt(formData.durationInDays),
    }),
    newBidPayload: (formData: NewBidFormData): NewBidPayload => ({
      ...formData,
      auctionId: frontToback.number2BigInt(formData.auctionId),
    }),
  },
};
