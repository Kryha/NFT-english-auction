import T "./types";
import Iter "mo:base/Iter";
import Array "mo:base/Array";
import Option "mo:base/Option";
import Principal "mo:base/Principal";

module {
  public func filterBidsByAuctionId(auctionId: T.AuctionId, bidMap: T.BidMap, auctionMap: T.AuctionMap): [T.BidObject] {
    switch (auctionMap.get(auctionId)) {
      case (null) return [];
      case (?auction) {
        let bids = Iter.toArray(bidMap.entries());
        return Array.mapFilter<(T.BidId, T.BidObject), T.BidObject>(bids, func ((_id, bid)) {
          if (bid.auctionId == auctionId) return ?bid;
          return null;
        });
      };
    };
  };

  public func validateBid(bid: T.NewBidPayload, auctionBids: [T.BidObject], auction: T.AuctionObject): Bool {
    var latestBid: Float = 0;
    if(auctionBids.size() > 0) {
      latestBid := auctionBids[auctionBids.size()-1].amount;
    };
    // StartPrice < Bid < BuyPrice
    let bidObjectooLow = bid.amount < auction.startPrice;
    let bidObjectooHigh = latestBid >= auction.buyNowPrice;

    if(bidObjectooLow or bidObjectooHigh) return false;

    // HighestBid < (Bid - minIncrement)
    if(auctionBids.size() > 0) {
      if(latestBid > bid.amount - auction.minIncrement) return false;
    };

    return true;
  };

  public func getHighestBid(bids : [T.BidObject]) : ?T.BidObject {
    if (bids.size() == 0) return null;
    let sortedBids = Array.sort<T.BidObject>(bids, func (a, b) {
      if (a.amount > b.amount) return #greater;
      if (a.amount < b.amount) return #less;
      #equal;
    });
    // TODO: check if highest is as expected
    let highestBid = sortedBids[bids.size() - 1];
    return ?highestBid;
  };

  public func populateAuctionsByIds(auctionIds: [T.AuctionId], allAuctions: T.AuctionMap) : [T.AuctionObject] {
    var auctions : [T.AuctionObject] = [];
    for(id in auctionIds.vals()) {
      switch (allAuctions.get(id)) {
        case (null) return [];
        case (?auction) auctions := Array.append(auctions, [auction.auction]);
      };
    };
    return auctions;
  };
};