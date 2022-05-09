import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";

import {
  resetAuctions,
  addAuctions,
  useCreateAuctionState,
  setFetchedAll,
  addBiddedAuctions,
  setFetchedBidded,
  addOwnAuctions,
  setFetchedOwn,
} from "../store";
import { APIHook } from "../../../types";
import { mediate } from "../utils";
import { useAuth } from "../hooks";

export const useGetAllAuctions: APIHook = () => {
  const dispatch = useDispatch();
  const { backend } = useAuth();
  const [loading, setLoading] = useState(false);

  const callback = useCallback(async () => {
    setLoading(true);
    try {
      const auctionStates = await backend.getAuctionList();
      const mediatedAuctions = auctionStates.map((auction) => mediate.toFront.auctionState(auction));

      dispatch(addAuctions(mediatedAuctions));
      dispatch(setFetchedAll(true));
    } catch (error) {
      console.warn("Get auctions failed: ", error);
    }
    setLoading(false);
  }, [backend, dispatch]);

  return [callback, loading];
};

export const useGetBiddedAuctions: APIHook = () => {
  const dispatch = useDispatch();
  const { backend } = useAuth();
  const [loading, setLoading] = useState(false);

  const callback = useCallback(async () => {
    setLoading(true);
    try {
      const res = await backend.getBiddedAuctions();

      if ("err" in res) throw res.err;

      const mediatedAuctions = res.ok.map((auction) => mediate.toFront.biddedAuctionState(auction));

      dispatch(addBiddedAuctions(mediatedAuctions));
      dispatch(setFetchedBidded(true));
    } catch (error) {
      console.warn("Get bidded auctions failed: ", error);
    }
    setLoading(false);
  }, [backend, dispatch]);

  return [callback, loading];
};

export const useGetOwnAuctions: APIHook = () => {
  const dispatch = useDispatch();
  const { backend } = useAuth();
  const [loading, setLoading] = useState(false);

  const callback = useCallback(async () => {
    setLoading(true);
    try {
      const res = await backend.getUserPendingAuctions();

      if ("err" in res) throw res.err;

      const parsedAuctions = res.ok.map((auction) => mediate.toFront.auctionObject(auction));

      dispatch(addOwnAuctions(parsedAuctions));
      dispatch(setFetchedOwn(true));
    } catch (error) {
      console.warn("Get own auctions failed: ", error);
    }
    setLoading(false);
  }, [backend, dispatch]);

  return [callback, loading];
};

export const useCreateAuction: APIHook = () => {
  const dispatch = useDispatch();
  const { formData } = useCreateAuctionState();
  const { backend } = useAuth();
  const [loading, setLoading] = useState(false);

  const callback = useCallback(async () => {
    setLoading(true);
    try {
      const payload = mediate.toBack.newAuctionPayload(formData);
      const res = await backend.newAuction(payload);

      if ("err" in res) throw res.err;

      dispatch(resetAuctions());
    } catch (error) {
      console.warn("Create auction failed: ", error);
    }
    setLoading(false);
  }, [backend, dispatch, formData]);

  return [callback, loading];
};

export type ActivateAuctionPayload = {
  auctionId: number;
  nftId: string;
};

export const useActivateAuction = (): ((payload: ActivateAuctionPayload) => Promise<void>) => {
  const dispatch = useDispatch();
  const { backend } = useAuth();

  return useCallback(
    async (payload: ActivateAuctionPayload) => {
      try {
        const res = await backend.activateAuction({
          auctionId: BigInt(payload.auctionId),
          nftId: BigInt(payload.nftId),
        });

        if ("err" in res) throw res.err;

        dispatch(resetAuctions());
      } catch (error) {
        console.warn("Activate auction failed: ", error);
      }
    },
    [backend, dispatch]
  );
};

export const useCloseAuction = (): ((arg0: number) => Promise<void>) => {
  const dispatch = useDispatch();
  const { backend } = useAuth();

  return useCallback(
    async (auctionId: number) => {
      try {
        const res = await backend.closeAuction(BigInt(auctionId));

        if ("err" in res) throw res.err;

        dispatch(resetAuctions());
      } catch (error) {
        console.warn("Close auction failed: ", error);
      }
    },
    [backend, dispatch]
  );
};
