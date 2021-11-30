export enum Mood {
  Positive = "positive",
  Neutral = "neutral",
  Negative = "negative",
}

// TODO: Agree on actual categories
export enum NFTCategory {
  Art = "art",
  Memes = "meme",
  TradingCards = "tradingCards",
  Music = "music",
  Other = "other",
}

export const NFTMetadataSizes: { [key: string]: number } = {
  title: 200,
  category: 100,
  description: 5000,
  link: 1000,
  nftId: 1000,
  sum: 7300,
};

export const NullNftId = "null";
