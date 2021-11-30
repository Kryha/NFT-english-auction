import FungibleToken "canister:fungibleToken";
import NFT "canister:nft";

import HashMap "mo:base/HashMap";
import Text "mo:base/Text";
import Float "mo:base/Float";
import Nat "mo:base/Nat";
import Principal "mo:base/Principal";
import Array "mo:base/Array";
import Time "mo:base/Time";
import Iter "mo:base/Iter";
import List "mo:base/List";
import Hash "mo:base/Hash";
import Debug "mo:base/Debug";
import Option "mo:base/Option";
import Result "mo:base/Result";

import T "types";
import Util "util";
import DbUtil "util-db";

actor AuctionController {
  type Result<T, E> = Result.Result<T, E>;

  // Import Utilities
  let eq = Util.eq;
  let validateBid = DbUtil.validateBid;
  let filterBidsByAuctionId = DbUtil.filterBidsByAuctionId;


  // Stable data structure (preserved across canister upgrades)
  stable var auctionId: Nat = 0;
  stable var bidId: Nat = 0;
  stable var DB: T.DB = {
    auctions: T.AuctionDb = [];
    bids: T.BidDb = [];
    users: T.UserDb = [];
  };

  // Migrate data to stable structure before canister upgrades
  system func preupgrade() {
    DB := {
      auctions: T.AuctionDb = Iter.toArray(auctionMap.entries());
      bids: T.BidDb = Iter.toArray(bidMap.entries());
      users: T.UserDb = Iter.toArray(userMap.entries());
    };
  };

  // Performant data structure (lost on canister upgrades)
  var auctionMap: T.AuctionMap = HashMap.fromIter<T.AuctionId, T.AuctionState>(DB.auctions.vals(), DB.auctions.size(), eq, Hash.hash);
  var bidMap: T.BidMap = HashMap.fromIter<T.BidId, T.BidObject>(DB.bids.vals(), DB.bids.size(), eq, Hash.hash);
  var userMap: T.UserMap = HashMap.fromIter<T.UserId, T.UserState>(DB.users.vals(), DB.auctions.size(), Principal.equal, Principal.hash);

  // API
  // Shared
  public shared({ caller }) func newAuction(auctionData : T.NewAuctionPayload) : async Result<(), T.Error> {
    if (not Util.isAuth(caller)) return #err(#Unauthorized);
    let nftOwner = await NFT.getOwnerOf(auctionData.nftId);
    switch(nftOwner) {
      case (#err(error)) return #err(#NotFound);
      case (#ok(owner)) {
        if (owner != caller) return #err(#NotAllowed);
      }
    };
    let auctionObject: T.AuctionObject = {
      id = auctionId;
      name = auctionData.name;
      description = auctionData.description;
      startPrice = auctionData.startPrice;
      minIncrement = auctionData.minIncrement;
      durationInDays = auctionData.durationInDays;
      buyNowPrice = auctionData.buyNowPrice;
      dateCreated = Time.now();
      owner = caller;
      status = #pending;
      nftId = auctionData.nftId;
    };
    let auctionState: T.AuctionState = {
      auction = auctionObject;
      bidIds = [];
      highestBid = null;
    };
    auctionMap.put(auctionId, auctionState);
    switch (userMap.get(caller)) {
      case (null) {
        userMap.put(caller, {
          auctionIds = [auctionId];
          bidIds = [];
        });
      };
      case (?userState) {
        userMap.put(caller, {
          auctionIds = Array.append(userState.auctionIds, [auctionId]);
          bidIds = userState.bidIds;
        });
      };
    };
    auctionId += 1;
    #ok();
  };

  public shared({ caller }) func activateAuction(payload : T.ActivateAuctionPayload) : async Result<(), T.Error> {
    if (not Util.isAuth(caller)) return #err(#Unauthorized);

    switch (auctionMap.get(payload.auctionId)) {
      case (null) return #err(#NotFound);
      case (?{ auction; bidIds; highestBid }) {
        if (auction.owner != caller or auction.status != #pending or auction.nftId != payload.nftId) return #err(#NotAllowed);
        let isTokenMine = await NFT.isTokenMine(auction.nftId);
        switch(isTokenMine) {
          case (#err(error)) return #err(#NotAllowed);
          case (#ok(mine)) {
            if (not mine) return #err(#NotAllowed);
          }
        };
        
        auctionMap.put(payload.auctionId, {
          highestBid;
          bidIds;
          auction = {
            id = auction.id;
            name = auction.name;
            description = auction.description;
            startPrice = auction.startPrice;
            minIncrement = auction.minIncrement;
            durationInDays = auction.durationInDays;
            buyNowPrice = auction.buyNowPrice;
            dateCreated = auction.dateCreated;
            owner = auction.owner;
            status = #active;
            nftId = auction.nftId;
          };
        });
        #ok();
      };
    }
  };

  public shared({ caller }) func bid(bid : T.NewBidPayload): async Result<T.BidObject, T.Error> {
    if (not Util.isAuth(caller)) return #err(#Unauthorized);

    switch(auctionMap.get(bid.auctionId)) {
      case (null) return #err(#NotFound);
      case (?auction) {
        if (caller == auction.auction.owner or auction.auction.status != #active) return #err(#NotAllowed);
        let bids: [T.BidObject] = filterBidsByAuctionId(bid.auctionId, bidMap, auctionMap);
        var isValid: Bool = validateBid(bid, bids, auction.auction);
        if (not isValid) return #err(#InvalidRequest);

        let auctionExpiration = Util.addDays(auction.auction.dateCreated, auction.auction.durationInDays);
        if (Time.now() >= auctionExpiration) return #err(#NotAllowed);

        let presentBalance = await FungibleToken.balanceOf(caller);
        let tokenAmount = Util.tokenAmountToNat(Util.dollarsToToken(bid.amount));
        if (presentBalance < tokenAmount) return #err(#InsufficientBalance);

        // Return tokens to previous highest bidder
        switch (DbUtil.getHighestBid(bids)) {
          case (null) {};
          case (?highestBid) {
            let tokenAmount = Util.tokenAmountToNat(Util.dollarsToToken(highestBid.amount));
            switch (await FungibleToken.transfer(highestBid.bidder, tokenAmount)) {
              case (#err(error)) return #err(error);
              case (#ok(_)) {};
            };
          };
        };

        let bidObject: T.BidObject = {
          auctionId = bid.auctionId;
          amount = bid.amount;
          bidDate = Time.now();
          bidder = caller;
          id = bidId;
          confirmed = false;
        };

        // Update Bid Map
        bidMap.put(bidId, bidObject);

        // Update Auction Map
        let updatedAuctionState: T.AuctionState = {
          auction = auction.auction;
          bidIds: [T.BidId] = Array.append(auction.bidIds, [bidObject.id]);
          highestBid = ?bidObject;
        };
        ignore auctionMap.replace(bid.auctionId, updatedAuctionState);

        // Update User Map
        switch(userMap.get(caller)) {
          case (null) {
            userMap.put(caller, {
              bidIds = [bidId];
              auctionIds = [];
            });
          };
          case (?userState) {
            userMap.put(caller, {
              bidIds = Array.append(userState.bidIds, [bidId]);
              auctionIds = userState.auctionIds;
            });
          };
        };
        bidId += 1;
        #ok(bidObject);
      };
    };
  };

  // TODO: send NFT to auction winner
  public shared({ caller }) func closeAuction(auctionId : T.AuctionId) : async Result<(), T.Error> {
    if (not Util.isAuth(caller)) return #err(#Unauthorized);

    switch (auctionMap.get(auctionId)) {
      case (null) return #err(#NotFound);
      case (?{ auction; bidIds; highestBid; }) {
        if (caller != auction.owner) return #err(#NotAllowed);

        let auctionExpiration = Util.addDays(auction.dateCreated, auction.durationInDays);
        let bids = filterBidsByAuctionId(auctionId, bidMap, auctionMap);

        switch (highestBid) {
          case (null) {
            if (Time.now() < auctionExpiration) return #err(#NotAllowed);
            auctionMap.put(auctionId, {
              highestBid;
              bidIds;
              auction = {
                id = auction.id;
                name = auction.name;
                description = auction.description;
                startPrice = auction.startPrice;
                minIncrement = auction.minIncrement;
                durationInDays = auction.durationInDays;
                buyNowPrice = auction.buyNowPrice;
                dateCreated = auction.dateCreated;
                owner = auction.owner;
                status = #closed;
                nftId = auction.nftId;
              };
            });
            return #ok();
          };
          case (?highestBid) {
            if (Time.now() < auctionExpiration and highestBid.amount < auction.buyNowPrice) return #err(#NotAllowed);
            let tokenAmount = Util.tokenAmountToNat(Util.dollarsToToken(highestBid.amount));
            switch(await NFT.transfer(highestBid.bidder, auction.nftId)) {
              case (#err(error)) return #err(#Internal);
              case (#ok(_)) {}
            };

            switch (await FungibleToken.transfer(auction.owner, tokenAmount)) {
              case (#err(error)) return #err(error);
              case (#ok(_)) {
                auctionMap.put(auctionId, {
                  highestBid = ?highestBid;
                  bidIds;
                  auction = {
                    id = auction.id;
                    name = auction.name;
                    description = auction.description;
                    startPrice = auction.startPrice;
                    minIncrement = auction.minIncrement;
                    durationInDays = auction.durationInDays;
                    buyNowPrice = auction.buyNowPrice;
                    dateCreated = auction.dateCreated;
                    owner = auction.owner;
                    status = #closed;
                    nftId = auction.nftId;
                  };
                });
                return #ok();
              }
            };
          };
        };
      };
    };
  };

  // TODO: change this function in production
  public func mockTopUp(account : Principal, amount : Nat) : async Result<(), T.Error> {
    switch (await FungibleToken.transfer(account, amount)) {
      case (#err(error)) return #err(error);
      case (#ok(_)) return #ok();
    };
  };

  // TODO: change this function in production
  public shared({ caller }) func selfTopUp(amount : Nat) : async Result<(), T.Error> {
    switch (await FungibleToken.transfer(caller, amount)) {
      case (#err(error)) return #err(error);
      case (#ok(_)) return #ok();
    };
  };

  // Query
  public query func getAuctionById(id : T.AuctionId) : async Result<T.AuctionState, T.Error> {
    switch (auctionMap.get(id)) {
      case (null) #err(#NotFound);
      case (?auction) #ok(auction);
    };
  };

  public query func getAuctionList() : async [T.AuctionState] {
    var allAuctions: [T.AuctionState] = [];
    for(auction in auctionMap.entries()){
      allAuctions := Array.append(allAuctions, [auction.1]);
    };

    return allAuctions;
  };

  public query({ caller }) func getUserPendingAuctions() : async Result<[T.AuctionObject], T.Error> {
    if (not Util.isAuth(caller)) return #err(#Unauthorized);
    let userData = userMap.get(caller);
    switch (userData) {
      case (null) #err(#NotFound);
      case (?userState) {
        let userAuctions: [T.AuctionObject] = DbUtil.populateAuctionsByIds(userState.auctionIds, auctionMap);
        let pendingAuctions: [T.AuctionObject] = Array.filter<T.AuctionObject>(userAuctions, func (auction: T.AuctionObject) { auction.status == #pending });
        #ok(pendingAuctions);
      };
    };
  };

  public query({ caller }) func getBiddedAuctions() : async Result<[T.BiddedAuctionState], T.Error> {
    switch (userMap.get(caller)) {
      case (null) return #ok([]);
      case (?state) {
        let bids = Array.mapFilter<T.BidId, T.BidObject>(state.bidIds, func (bidId) { bidMap.get(bidId) });
        let highestUserBids = HashMap.fromIter<T.AuctionId, T.BidObject>([].vals(), 0, eq, Hash.hash);
        let biddedAuctions = HashMap.fromIter<T.AuctionId, T.AuctionState>([].vals(), 0, eq, Hash.hash);

        for (bid in bids.vals()) {
          switch (highestUserBids.get(bid.auctionId)) {
            case (null) {
              highestUserBids.put(bid.auctionId, bid);
            };
            case (?highestBid) {
              if (highestBid.amount < bid.amount) {
                highestUserBids.put(bid.auctionId, bid);
              }
            };
          };

          switch (auctionMap.get(bid.auctionId)) {
            case (null) return #err(#Internal);
            case (?auction) {
              biddedAuctions.put(bid.auctionId, auction);
            };
          };
        };

        var ret : [T.BiddedAuctionState] = [];
        for ((auctionId, auction) in biddedAuctions.entries()) {
          switch (highestUserBids.get(auctionId)) {
            case (null) return #err(#Internal);
            case (?userBid) {
              ret := Array.append(ret, [{
                auction = auction.auction;
                bidIds = auction.bidIds;
                highestBid = auction.highestBid;
                userBid;
              }]);
            };
          };
        };

        #ok(ret);
      };
    };
  };

  public query func getBidList() : async [T.BidObject] {
    var allBids: [T.BidObject] = [];
    for(bid in bidMap.entries()) {
      allBids := Array.append(allBids, [bid.1]);
    };
    return allBids;
  };

  public query func getBidsByAuction(auctionId : T.AuctionId) : async [T.BidObject] {
    filterBidsByAuctionId(auctionId, bidMap, auctionMap);
  };

  public query({ caller }) func getUserState() : async Result<T.UserState, T.Error> {
    if (not Util.isAuth(caller)) return #err(#Unauthorized);

    switch (userMap.get(caller)) {
      case (null) #err(#NotFound);
      case (?userState) #ok(userState);
    };
  };
};
