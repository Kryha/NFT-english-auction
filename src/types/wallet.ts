import { NFTCategory } from "./const";

export interface File {
  data: ArrayBuffer;
  type: string;
  name: string;
}

// TODO: Agrre on actual token structure
export interface TokenObject {
  owner: string;
  tokenId: number;
  file: File;
  title: string;
  description: string;
  category: string;
  link: string;
  nftId: string;
}
export interface TokenState {
  token: TokenObject;
}

// TODO: Get the payload from backend instead
export interface NewTokenFormData {
  file: File;
  title: string;
  link: string;
  description: string;
  category: NFTCategory;
  nftId: string;
}
