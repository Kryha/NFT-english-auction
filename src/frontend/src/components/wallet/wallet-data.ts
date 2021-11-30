import { TokenObject, NFTCategory, NullNftId } from "../../../../types";

const mockFile = new ArrayBuffer(8);

export const WalletData: TokenObject[] = [
  {
    owner: "Mary Jane enterprises",
    tokenId: 1,
    title: "Joke",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed viverra tellus in hac habitasse platea dictumst vestibulum. Ultrices dui sapien eget mi proin. Pellentesque pulvinar pellentesque habitant morbi tristique senectus et. Et tortor at risus viverra adipiscing at in tellus integer. Enim lobortis scelerisque fermentum dui faucibus in ornare quam. Nunc sed velit dignissim sodales.",
    category: NFTCategory.Art,
    file: { data: mockFile, name: "", type: "" },
    link: "",
    nftId: NullNftId,
  },
  {
    owner: "Mary Jane enterprises",
    tokenId: 2,
    title: "Joker",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed viverra tellus in hac habitasse platea dictumst vestibulum. Ultrices dui sapien eget mi proin. Pellentesque pulvinar pellentesque habitant morbi tristique senectus et. Et tortor at risus viverra adipiscing at in tellus integer. Enim lobortis scelerisque fermentum dui faucibus in ornare quam. Nunc sed velit dignissim sodales.",
    category: NFTCategory.Memes,
    file: { data: mockFile, name: "", type: "" },
    link: "",
    nftId: NullNftId,
  },

  {
    owner: "Mary Jane enterprises",
    tokenId: 3,
    title: "Jokers",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed viverra tellus in hac habitasse platea dictumst vestibulum. Ultrices dui sapien eget mi proin. Pellentesque pulvinar pellentesque habitant morbi tristique senectus et. Et tortor at risus viverra adipiscing at in tellus integer. Enim lobortis scelerisque fermentum dui faucibus in ornare quam. Nunc sed velit dignissim sodales.",
    category: NFTCategory.TradingCards,
    file: { data: mockFile, name: "", type: "" },
    link: "",
    nftId: NullNftId,
  },
];
