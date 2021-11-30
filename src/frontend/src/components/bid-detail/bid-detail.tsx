import React, { FC } from "react";

import { path } from "../../assets/util";
import { BaseRoute, BackWithLink, AuctionDetailContainer } from "../../view";
import { BidContainer } from "./styles";
import { GenericError } from "../generic-error";
import * as text from "../../assets/text";
import { useBiddedAuctionByRouteId } from "../../hooks";

export const BidDetail: FC = () => {
  const [auction] = useBiddedAuctionByRouteId();

  if (!auction) return <GenericError errorTitle={text.noAuctionFound} returnRoute={path.myBids} />;

  return (
    <BaseRoute>
      <BackWithLink link={path.myBids} />
      <BidContainer>
        <AuctionDetailContainer auction={auction.auction} highestBid={auction.highestBid} isBiddingAllowed />
      </BidContainer>
    </BaseRoute>
  );
};
