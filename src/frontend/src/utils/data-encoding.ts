import { NFTMetadataSizes, TokenObject, File } from "../../../types";

export const bufferToDataURL = (buffer: ArrayBuffer): string => {
  return URL.createObjectURL(new Blob([buffer]));
};

export type NFTMetadata = Pick<TokenObject, "title" | "category" | "description" | "link" | "nftId">;

export const encodeMetadata = (metadata: NFTMetadata): number[] => {
  const encoder = new TextEncoder();
  const str = Object.entries(metadata)
    .map(([key, value]) => {
      return value.padEnd(NFTMetadataSizes[key], " ");
    })
    .join("");
  return [...encoder.encode(str)];
};

export const decodeMetadata = (payload: number[]): { metadata: NFTMetadata; file: number[] } => {
  const utf8decoder = new TextDecoder();
  const encodedMetadata = payload.slice(0, NFTMetadataSizes.sum);
  const file = payload.slice(NFTMetadataSizes.sum);
  const metadataStr = utf8decoder.decode(new Uint8Array(encodedMetadata).buffer);
  const metadata = {
    title: metadataStr.substr(0, NFTMetadataSizes.title).trimEnd(),
    category: metadataStr.substr(NFTMetadataSizes.title, NFTMetadataSizes.category).trimEnd(),
    description: metadataStr.substr(NFTMetadataSizes.title + NFTMetadataSizes.category, NFTMetadataSizes.description).trimEnd(),
    link: metadataStr
      .substr(NFTMetadataSizes.title + NFTMetadataSizes.category + NFTMetadataSizes.description, NFTMetadataSizes.link)
      .trimEnd(),
    nftId: metadataStr
      .substr(
        NFTMetadataSizes.title + NFTMetadataSizes.category + NFTMetadataSizes.description + NFTMetadataSizes.link,
        NFTMetadataSizes.nftId
      )
      .trimEnd(),
  };
  return { metadata, file };
};

export const decodePayload = (payload: number[], type: string): { metadata: NFTMetadata; file: File } => {
  const { metadata, file } = decodeMetadata(payload);
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
