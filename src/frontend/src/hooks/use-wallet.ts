import { useEffect } from "react";
import { TokenObject } from "../../../types";

import { useGetMyNftBalance } from "../service/nft";
import { useNFTWallet } from "../store";

type UseNFTReturn = [TokenObject[], boolean];

// TODO: add a refresh button or something similar for refetching
export const useNFT = (): UseNFTReturn => {
  const { tokens, fetched } = useNFTWallet();
  const [getNFTBalance, fetching] = useGetMyNftBalance();
  useEffect(() => {
    if (!fetched) getNFTBalance();
  }, [fetched, getNFTBalance]);

  return [tokens, fetching];
};
