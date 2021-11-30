import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";

import { APIHook } from "../../../types";
import { BACKEND_PRINCIPAL, path } from "../assets";
import { useAuth } from "../hooks";
import { setHighestBid, useCreateBidState } from "../store";
import { dollarsToToken, mediate, tokenAmountToInt } from "../utils";

export const useCreateBid: APIHook = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { backend, fungibleToken } = useAuth();
  const { formData } = useCreateBidState();
  const [loading, setLoading] = useState(false);

  const handleError = useCallback(
    (err: unknown) => {
      setLoading(false);
      console.warn("Bid Creation failed: ", err);
      // TODO: redirect to an error page or something similar
      history.push(path.dashboard);
    },
    [history]
  );

  // TODO: revert bid creation if transfer fails
  const callback = useCallback(async () => {
    setLoading(true);
    try {
      const bidPayload = mediate.toBack.newBidPayload(formData);
      const tokens = dollarsToToken(bidPayload.amount);
      const tokenAmount = tokenAmountToInt(tokens);

      const bidRes = await backend.bid(bidPayload);
      if ("err" in bidRes) return handleError(bidRes.err);

      const transferRes = await fungibleToken.transfer(BACKEND_PRINCIPAL, tokenAmount);
      if ("err" in transferRes) return handleError(transferRes.err);

      const bid = mediate.toFront.bidObject(bidRes.ok);
      dispatch(setHighestBid(bid));
      setLoading(false);
      history.push(path.dashboard + path.confirmation);
    } catch (error) {
      handleError(error);
    }
  }, [backend, dispatch, formData, fungibleToken, handleError, history]);

  return [callback, loading];
};
