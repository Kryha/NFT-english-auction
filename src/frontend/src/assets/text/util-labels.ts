import { MAX_ADDRESS_LENGTH, MIN_LENGTH } from "../util/constants";

// Time labels
export const timeRemaining = (days: number, hours: number, minutes: number, seconds: number): string =>
  `${days} d  ${hours} h ${minutes} m ${seconds} s`;

// Card labels
export const startingBid = (startPrice: number): string => `starting bid: € ${startPrice}`;
export const lotLabel = (lot: string | number | bigint): string => `lot ${lot}`;
export const ownerLabel = (owner: string): string => `owner: ${owner}`;

// Bid labels
export const monetaryValue = (amount: number): string => `€ ${amount}`;
export const successfulBid = (name: string): string => `your bid has been succesfully placed for ${name}.`;

// Wallet labels
export const ownedBy = (owner: string): string => `owned by ${owner}`;

export const truncateString = (address: string): string => {
  if (address.length >= MAX_ADDRESS_LENGTH) {
    return `${address.substr(0, MIN_LENGTH)}...${address.substr(address.length - MIN_LENGTH, address.length)}`;
  }
  return address;
};

export const successfulNftCreation = (name: string): string => `congratulations you have just created ${name}!`;

// Form labels
export const moreThan = (value: string, amount: number): string => `the ${value} must be larger than ${amount}`;
export const lessThan = (validationName: string, amount: number): string => `the ${validationName} must be less than ${amount}`;

export const noTokenFound = (id: string): string => `no token was found with id ${id}.`;

export const activateYourNft = (name: string): string => `activating ${name} means that you will be able to receive bids immediately.`;

export const activateNftWarning = (name: string): string => `are you sure you want to activate ${name}? This action can not be undone.`;
