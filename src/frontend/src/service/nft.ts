import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";

import { APIHook, TokenObject, File as FileObj } from "../../../types";
import { useAuth } from "../hooks";
import { resetTokenInputs, setNFTWallet, useCreateTokenState, useWalletValues } from "../store";
import { MintPayload, PayloadResult } from "../../../declarations/nft/nft.did";
import { decodeMetadata, encodeMetadata, NFTMetadata } from "../utils/data-encoding";

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
      nft.mint(mintPayload);
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
      const nftIds = await nft.getMyBalance();

      if ("err" in nftIds) throw nftIds.err;

      const tokenList: TokenObject[] = await Promise.all(
        nftIds.ok.map(async (id) => {
          const token = await nft.getToken(id);
          if ("err" in token) throw token.err;
          const { metadata, file } = decodePayload(token.ok.payload, token.ok.contentType);

          return {
            tokenId: parseInt(id),
            owner: token.ok.owner.toString(),
            file: file,
            title: metadata.title,
            description: metadata.description,
            category: metadata.category,
            link: metadata.link,
            nftId: metadata.nftId,
          };
        })
      );

      dispatch(
        setNFTWallet({
          tokens: tokenList,
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
        const res = await nft.transferToAuction(tokenId);
        if ("err" in res) throw res.err;
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
  const [, wallet] = useWalletValues();
  return useCallback(
    async (tokenId: string) => {
      try {
        const res = await nft.getToken(tokenId);
        if ("err" in res) throw res.err;
        const { metadata, file } = decodePayload(res.ok.payload, res.ok.contentType);
        const token: TokenObject = {
          tokenId: parseInt(tokenId),
          owner: res.ok.owner.toString(),
          file: file,
          title: metadata.title,
          description: metadata.description,
          category: metadata.category,
          link: metadata.link,
          nftId: metadata.nftId,
        };
        dispatch(
        setNFTWallet({
          tokens: [...wallet.tokens, token],
          fetched: true,
        })
      );
      } catch (error) {
        console.warn("Get NFT failed: ", error);
      }
    },
    [dispatch, nft]
  );
};

const decodePayload = (payload: PayloadResult, type: string): { metadata: NFTMetadata; file: FileObj } => {
  // properly safeguard against missing file
  let encodedPayload: number[] = [];
  if ("Complete" in payload) {
    encodedPayload = payload.Complete;
  }
  const { metadata, file } = decodeMetadata(encodedPayload);
  const fileBuffer: ArrayBuffer = new Uint8Array(file).buffer;
  return {
    metadata,
    file: {
      data: fileBuffer,
      type,
      name: metadata.title,
    },
  };
};
