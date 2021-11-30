import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";

module {
  type ID = Nat;
  public type Timestamp = Int;
  public type AuctionMap = HashMap.HashMap<ID, AuctionState>;
  public type BidMap = HashMap.HashMap<ID, BidObject>;
  public type UserMap = HashMap.HashMap<Principal, UserState>;
  public type AuctionId = ID;
  public type BidId = ID;
  public type NftId = Text;
  public type UserId = Principal;

  public type DB = {
    auctions: AuctionDb;
    bids: BidDb;
    users: UserDb;
  };

  public type AuctionDb = [(AuctionId, AuctionState)];
  public type BidDb = [(BidId, BidObject)];
  public type UserDb = [(Principal, UserState)];

  public type AuctionStatus = {
    #pending;
    #active;
    #closed;
  };

  public type AuctionObject = {
    id: AuctionId;
    name: Text;
    description: Text;
    startPrice: Float;
    minIncrement: Float;
    durationInDays: Nat;
    buyNowPrice: Float;
    dateCreated: Timestamp;
    owner: Principal;
    status: AuctionStatus;
    nftId: NftId;
  };

  public type BidObject = {
    amount: Float;
    bidDate: Timestamp;
    bidder: Principal;
    auctionId: AuctionId;
    id: BidId;
    confirmed: Bool;
  };

  public type AuctionState = {
    auction: AuctionObject;
    bidIds: [BidId];
    highestBid: ?BidObject;
  };

  public type BiddedAuctionState = {
    auction: AuctionObject;
    bidIds: [BidId];
    highestBid: ?BidObject;
    userBid: BidObject;
  };

  public type UserState = {
    auctionIds: [AuctionId];
    bidIds: [BidId];
  };

  public type NewAuctionPayload = {
    name: Text;
    description: Text;
    startPrice: Float;
    minIncrement: Float;
    durationInDays: Nat;
    buyNowPrice: Float;
    nftId: NftId;
  };
  
  public type ActivateAuctionPayload = {
    auctionId: AuctionId;
    nftId: NftId;
  };

  public type NewBidPayload = {
    amount: Float;
    auctionId: AuctionId;
  };

  public type Error = {
    #Internal;
    #Unauthorized;
    #NotFound;
    #NotInitialized;
    #NotAllowed;
    #InvalidRequest;
    #InsufficientBalance;
    #InsufficientAllowance;
  };
};
