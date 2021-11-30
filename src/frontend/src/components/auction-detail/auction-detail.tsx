import React, { FC } from "react";

import { path } from "../../assets/util";
import { BaseRoute, BackWithLink, AuctionDetailContainer } from "../../view";
import { AuctionContainer } from "./styles";
import { useAuctionByRouteId } from "../../hooks";
import { GenericError } from "../generic-error";
import * as text from "../../assets/text";

export const AuctionDetail: FC = () => {
  const [auction] = useAuctionByRouteId();

  if (!auction) return <GenericError errorTitle={text.noAuctionFound} returnRoute={path.dashboard} />;

  return (
    <BaseRoute>
      <BackWithLink link={path.dashboard} />
      <AuctionContainer>
        <AuctionDetailContainer auction={auction.auction} highestBid={auction.highestBid} isBiddingAllowed />
      </AuctionContainer>
    </BaseRoute>
  );
};
