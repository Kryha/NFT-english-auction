import React, { FC } from "react";
import { BaseRoute, AuctionCard, ContentLoader, OverviewEmpty, Title, ButtonBase } from "../../view";
import * as text from "../../assets/text";
import { DashboardContainer } from "./styles";
import { path } from "../../assets/util";
import { useAuctions, useAuth } from "../../hooks";
import { RouteHeader } from "../my-auctions/styles";
import { useHistory } from "react-router";

export const Dashboard: FC = () => {
  const history = useHistory();
  const { isAuthenticated } = useAuth();
  const [auctions, fetching] = useAuctions();

  return (
    <BaseRoute>
      <RouteHeader>
        <Title>{text.dashboard}</Title>
        {isAuthenticated && (
          <ButtonBase
            onClick={(): void => {
              history.push(path.topUp);
            }}
          >
            {text.creditTopUp}
          </ButtonBase>
        )}
      </RouteHeader>
      <ContentLoader loading={fetching}>
        {!auctions.length ? (
          <OverviewEmpty title={text.noAuctionsAvailble} quote={text.noAuctionsAvailbleQuote} />
        ) : (
          <DashboardContainer>
            {auctions.map(({ auction, highestBid }) => (
              <AuctionCard
                key={String(auction.id)}
                link={`${path.dashboard}/${auction.id}`}
                data={auction}
                highestBid={highestBid?.amount || 0}
              />
            ))}
          </DashboardContainer>
        )}
      </ContentLoader>
    </BaseRoute>
  );
};
