import React, { FC } from "react";
import { BaseRoute, AuctionCard, ContentLoader, OverviewEmpty, Title, ButtonBase } from "../../view";
import * as text from "../../assets/text";
import { DashboardContainer, RouteHeader } from "./styles";
import { path } from "../../assets/util";
import { useOwnAuctions } from "../../hooks";
import { useHistory } from "react-router-dom";

export const MyAuctions: FC = () => {
  const [ownAuctions, fetching] = useOwnAuctions();
  const history = useHistory();

  return (
    <BaseRoute>
      <RouteHeader>
        <Title>{text.myAuctions}</Title>
        <ButtonBase
          onClick={(): void => {
            history.push(path.newAuction);
          }}
        >
          {text.createAuction}
        </ButtonBase>
      </RouteHeader>
      <ContentLoader loading={fetching}>
        {!ownAuctions.length ? (
          <OverviewEmpty title={text.noAuctionsAvailble} quote={text.noAuctionsAvailbleQuote} />
        ) : (
          <DashboardContainer>
            {ownAuctions.map((auction) => (
              <AuctionCard key={String(auction.id)} link={`${path.myAuctions}${path.activate}`} data={auction} highestBid={0} />
            ))}
          </DashboardContainer>
        )}
      </ContentLoader>
    </BaseRoute>
  );
};
