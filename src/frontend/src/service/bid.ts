import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";

import { TransferArgs } from "../../../declarations/ledger/ledger.did";
import { APIHook } from "../../../types";
import { LEDGER_FEE, path } from "../assets";
import { useAuth } from "../hooks";
import { setHighestBid, useCreateBidState } from "../store";
import { dollarsToToken, mediate, tokenAmountToInt } from "../utils";

export const useCreateBid: APIHook = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { backend, ledger } = useAuth();
  const { formData } = useCreateBidState();
  const [loading, setLoading] = useState(false);

  // TODO: revert bid creation if transfer fails
  const callback = useCallback(async () => {
    setLoading(true);
    try {
      const bidPayload = mediate.toBack.newBidPayload(formData);
      const tokens = dollarsToToken(bidPayload.amount);
      const tokenAmount = tokenAmountToInt(tokens);

      const bidRes = await backend.bid(bidPayload);
      if ("err" in bidRes) throw bidRes.err;

      const toAccount = await backend.canisterAccountId();

      const transferParam: TransferArgs = {
        memo: BigInt(1),
        from_subaccount: [],
        to: toAccount,
        amount: { e8s: tokenAmount },
        fee: { e8s: LEDGER_FEE },
        created_at_time: [],
      };

      const transferRes = await ledger.transfer(transferParam);
      if ("Err" in transferRes) throw transferRes.Err;

      const bid = mediate.toFront.bidObject(bidRes.ok);

      dispatch(setHighestBid(bid));
      history.push(path.dashboard + path.confirmation);
    } catch (error) {
      console.warn("Bid Creation failed: ", error);
    }
    setLoading(false);
  }, [backend, dispatch, formData, history, ledger]);

  return [callback, loading];
};
