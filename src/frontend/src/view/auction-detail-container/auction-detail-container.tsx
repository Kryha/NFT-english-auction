import React, { FC } from "react";

import { GeneralText, HeaderHorizontalBorder, SubTitle } from "../../view";
import { DetailsContainer, AddPhotoIcon, TableContainer } from "./styles";
import { AuctionObject, AuctionStatus, BidObject } from "../../../../types";
import * as text from "../../assets";
import { AuctionDetailTable } from "../auction-detail-table";
import { CreateBidForm } from "../create-bid-form";
import { useAuth } from "../../hooks";

interface Props {
  auction: AuctionObject;
  highestBid?: BidObject;
  isBiddingAllowed?: boolean;
}

export const AuctionDetailContainer: FC<Props> = ({ auction, isBiddingAllowed, highestBid }) => {
  const incrementAmount = highestBid ? auction.minIncrement + highestBid.amount : auction.startPrice;
  const auth = useAuth();
  const allowBids = isBiddingAllowed && auth.principalId !== auction.owner;
  return (
    <>
      <DetailsContainer>
        <AddPhotoIcon />
        <TableContainer>
          <AuctionDetailTable auction={auction} highestBid={highestBid} />
          {auction.status === AuctionStatus.Active && allowBids && auth.isAuthenticated && (
            <CreateBidForm auction={auction} minimumIncrement={incrementAmount} />
          )}
        </TableContainer>
      </DetailsContainer>
      <HeaderHorizontalBorder />
      <SubTitle>{text.about}</SubTitle>
      <GeneralText>{auction.description}</GeneralText>
    </>
  );
};
