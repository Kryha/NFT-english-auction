import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";

import { APIHook, TokenObject } from "../../../types";
import { useAuth } from "../hooks";
import { addToNFTWallet, resetTokenInputs, setNFTWallet, useCreateTokenState } from "../store";
import { MintPayload } from "../../../declarations/nft/nft.did";
import { encodeMetadata } from "../utils/data-encoding";
import { mediate } from "../utils";

export const useCreateNft: APIHook = () => {
  const dispatch = useDispatch();

  const { formData } = useCreateTokenState();

  const { nft } = useAuth();
  const [loading, setLoading] = useState(false);

  const callback = useCallback(async () => {
    setLoading(true);
    try {
      const metadata = {
        title: formData.title,
        category: formData.category,
        description: formData.description,
        link: formData.link,
        nftId: formData.nftId,
      };
      const uint8File = new Uint8Array(formData.file.data);
      const encodedMetadata = encodeMetadata(metadata);
      const payload = [...encodedMetadata, ...uint8File];
      const mintPayload: MintPayload = {
        contentType: formData.file.type,
        owner: [],
        isPrivate: false,
        payload: payload,
      };

      const res = await nft.mintForMyself(mintPayload);

      if ("Err" in res) throw res.Err;

      dispatch(resetTokenInputs());
    } catch (error) {
      console.warn("Create nft failed: ", error);
    }
    setLoading(false);
  }, [nft, dispatch, formData]);

  return [callback, loading];
};

export const useGetMyNftBalance: APIHook = () => {
  const dispatch = useDispatch();

  const { nft } = useAuth();
  const [loading, setLoading] = useState(false);

  const callback = useCallback(async () => {
    setLoading(true);
    try {
      const tokens = await nft.getMyTokens();

      const tokenList: (TokenObject | undefined)[] = await Promise.all(tokens.map(async (token) => mediate.toFront.token(token)));

      const tokenObjects = tokenList.filter((token) => !!token) as TokenObject[];

      dispatch(
        setNFTWallet({
          tokens: tokenObjects,
          fetched: true,
        })
      );
    } catch (error) {
      console.warn("Get NFT balance failed: ", error);
    }
    setLoading(false);
  }, [dispatch, nft]);

  return [callback, loading];
};

export const useTransferNft = (): ((tokenId: string) => Promise<void>) => {
  const { nft } = useAuth();

  return useCallback(
    async (tokenId: string) => {
      try {
        const id = BigInt(tokenId);
        const res = await nft.transferToAuction(id);
        if ("Err" in res) throw res.Err;
      } catch (error) {
        console.warn("Transfer NFT failed: ", error);
      }
    },
    [nft]
  );
};

export const useGetNftById = (): ((tokenId: string) => Promise<void>) => {
  const { nft } = useAuth();
  const dispatch = useDispatch();

  return useCallback(
    async (tokenId: string) => {
      try {
        const id = BigInt(tokenId);
        const res = await nft.getTokenInfo(id);
        const token = mediate.toFront.token(res);

        if (!token) return;

        dispatch(addToNFTWallet([token]));
      } catch (error) {
        console.warn("Get NFT failed: ", error);
      }
    },
    [dispatch, nft]
  );
};
