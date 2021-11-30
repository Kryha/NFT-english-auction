import React, { FC } from "react";

import { BiddedAuctionState } from "../../../../types";
import { BidOverviewBoxContainer } from "./style";
import { LabeledData } from "../label";
import { statusColor } from "../../design-system";
import { useCountdown } from "../../utils";
import { FlexBoxContainer, LinkContainer } from "../atoms";
import { path } from "../../assets/util/paths";
import { LARGE_FLEXBOX_SIZE, MEDIUM_FLEXBOX_SIZE, SMALL_FLEXBOX_SIZE } from "../../assets/util/constants";

interface BidOverviewBoxProps {
  auction: BiddedAuctionState;
}

export const BidOverviewBox: FC<BidOverviewBoxProps> = ({ auction: { auction, userBid, highestBid } }) => {
  const timeLeft = useCountdown(auction.deadline);
  return (
    <LinkContainer to={`${path.myBids}/${auction.id}`}>
      <BidOverviewBoxContainer>
        <FlexBoxContainer size={LARGE_FLEXBOX_SIZE}>
          <LabeledData label={auction.name} />
        </FlexBoxContainer>
        <FlexBoxContainer size={SMALL_FLEXBOX_SIZE}>
          <LabeledData label={auction.buyNowPrice} />
        </FlexBoxContainer>
        <LabeledData label={userBid.amount} />
        <LabeledData label={highestBid?.amount || userBid.amount} />
        <FlexBoxContainer size={MEDIUM_FLEXBOX_SIZE}>
          <LabeledData label={timeLeft} />
        </FlexBoxContainer>
        <LabeledData label={auction.status} customColor={statusColor[auction.status]} />
      </BidOverviewBoxContainer>
    </LinkContainer>
  );
};
