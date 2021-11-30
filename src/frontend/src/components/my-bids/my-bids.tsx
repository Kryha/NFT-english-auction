import React, { FC } from "react";

import { BaseRoute, BidOverviewBox, ContentLoader, Title, BidHeader } from "../../view";
import * as text from "../../assets/text";
import { useBiddedAuctions } from "../../hooks";

export const MyBids: FC = () => {
  const [auctions, fetching] = useBiddedAuctions();

  return (
    <BaseRoute>
      <Title>{text.myBids}</Title>
      <BidHeader />
      <ContentLoader loading={fetching}>
        {auctions.map((auction) => (
          <BidOverviewBox key={auction.auction.id} auction={auction} />
        ))}
      </ContentLoader>
    </BaseRoute>
  );
};
