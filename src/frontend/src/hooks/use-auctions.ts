import { useEffect, useMemo } from "react";
import { useRouteMatch } from "react-router-dom";

import { AuctionObject, AuctionState, BiddedAuctionState } from "../../../types";
import { useGetAllAuctions, useGetBiddedAuctions, useGetOwnAuctions } from "../service";
import { useAuctionsState } from "../store";

// TODO: add a refresh button or something similar for refetching
export const useAuctions = (): [AuctionState[], boolean] => {
  const { auctions, fetchedAll } = useAuctionsState();
  const [getAllAuctions, fetching] = useGetAllAuctions();

  useEffect(() => {
    if (!fetchedAll) getAllAuctions();
  }, [fetchedAll, getAllAuctions]);

  return [Object.values(auctions), fetching];
};

// TODO: add a refresh button or something similar for refetching
export const useOwnAuctions = (): [AuctionObject[], boolean] => {
  const { ownAuctions, fetchedOwn } = useAuctionsState();
  const [getOwnAuctions, fetching] = useGetOwnAuctions();

  useEffect(() => {
    if (!fetchedOwn) getOwnAuctions();
  }, [fetchedOwn, getOwnAuctions]);

  return [Object.values(ownAuctions), fetching];
};

// TODO: add a refresh button or something similar for refetching
export const useBiddedAuctions = (): [BiddedAuctionState[], boolean] => {
  const { biddedAuctions, fetchedBidded } = useAuctionsState();
  const [getAuctions, fetching] = useGetBiddedAuctions();

  useEffect(() => {
    if (!fetchedBidded) getAuctions();
  }, [fetchedBidded, getAuctions]);

  return [Object.values(biddedAuctions), fetching];
};

interface DetailRouteParams {
  id: string;
}

export const useAuction = (id: number): [AuctionState | undefined, boolean] => {
  const [auctions, fetching] = useAuctions();
  const auction = useMemo(() => auctions.find((auction) => auction.auction.id === id), [auctions, id]);
  return [auction, fetching];
};

export const useBiddedAuction = (id: number): [BiddedAuctionState | undefined, boolean] => {
  const [auctions, fetching] = useBiddedAuctions();
  const auction = useMemo(() => auctions.find((auction) => auction.auction.id === id), [auctions, id]);
  return [auction, fetching];
};

export const useOwnAuction = (id: number): [AuctionObject | undefined, boolean] => {
  const [auctions, fetching] = useOwnAuctions();
  const auction = useMemo(() => auctions.find((auction) => auction.id === id), [auctions, id]);
  return [auction, fetching];
};

export const useAuctionByRouteId = (): [AuctionState | undefined, boolean] => {
  const { id } = useRouteMatch<DetailRouteParams>().params;
  const [auction, fetching] = useAuction(Number(id));
  return [auction, fetching];
};

export const useBiddedAuctionByRouteId = (): [BiddedAuctionState | undefined, boolean] => {
  const { id } = useRouteMatch<DetailRouteParams>().params;
  const [auction, fetching] = useBiddedAuction(Number(id));
  return [auction, fetching];
};

export const useOwnAuctionByRouteId = (): [AuctionObject | undefined, boolean] => {
  const { id } = useRouteMatch<DetailRouteParams>().params;
  const [auction, fetching] = useOwnAuction(Number(id));
  return [auction, fetching];
};
