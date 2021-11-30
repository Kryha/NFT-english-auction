import React, { FC } from "react";

import { defaultDateFormat, useCountdown } from "../../utils";
import { AuctionObject, BidObject } from "../../../../types";
import { Badge, HeaderHorizontalBorder, SubTitle, TableRow, TableText } from "../atoms";
import * as text from "../../assets";
import { statusColor } from "../../design-system";
import { DarkDetail } from "../../components/review-bid-modal/styles";
import { HeaderContainerText } from "./styles";

interface Props {
  auction: AuctionObject;
  highestBid?: BidObject;
}

export const AuctionDetailTable: FC<Props> = ({ auction, highestBid }) => {
  const timeLeft = useCountdown(auction.deadline);

  return (
    <>
      <TableRow>
        <HeaderContainerText>{text.lotLabel(auction.id)}</HeaderContainerText>
        <Badge customColor={statusColor[auction.status]}>{auction.status}</Badge>
      </TableRow>
      <SubTitle>{auction.name}</SubTitle>
      <DarkDetail>{text.ownerLabel(auction.owner)}</DarkDetail>
      <HeaderHorizontalBorder />
      <TableRow>
        <TableText>{text.timeLeft}</TableText>
        <DarkDetail>{timeLeft}</DarkDetail>
      </TableRow>
      <TableRow>
        <TableText>{text.dateEnded[auction.status]}</TableText>
        <DarkDetail>{defaultDateFormat(auction.deadline)}</DarkDetail>
      </TableRow>
      <HeaderHorizontalBorder />
      <TableRow>
        <TableText>{text.estimatedValue}</TableText>
        <DarkDetail>{text.monetaryValue(auction.buyNowPrice)}</DarkDetail>
      </TableRow>
      {highestBid ? (
        <>
          <TableRow>
            <TableText>{text.highestBid}</TableText>
            <DarkDetail>{text.monetaryValue(highestBid.amount)}</DarkDetail>
          </TableRow>
          <TableRow>
            <TableText>{text.minIncrement}</TableText>
            <DarkDetail>{text.monetaryValue(auction.minIncrement)}</DarkDetail>
          </TableRow>
        </>
      ) : (
        <TableRow>
          <TableText>{text.startPrice}</TableText>
          <DarkDetail>{text.monetaryValue(auction.startPrice)}</DarkDetail>
        </TableRow>
      )}
    </>
  );
};
