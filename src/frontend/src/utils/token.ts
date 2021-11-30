import { DOLLARS_PER_TOKEN, FUNGIBLE_TOKEN_DECIMALS } from "../assets";

export const tokenAmountToInt = (amount: number): bigint => {
  return BigInt(Math.floor(amount * 10 ** FUNGIBLE_TOKEN_DECIMALS));
};

export const tokenAmountToFloat = (amount: bigint): number => {
  return Number(amount) / 10 ** FUNGIBLE_TOKEN_DECIMALS;
};

export const tokenToDollars = (amount: number): number => {
  return amount * DOLLARS_PER_TOKEN;
};

export const dollarsToToken = (amount: number): number => {
  return amount / DOLLARS_PER_TOKEN;
};
