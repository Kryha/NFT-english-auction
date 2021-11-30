import Blob "mo:base/Blob";
import Debug "mo:base/debug";
import Error "mo:base/Error";
import Nat "mo:base/Nat";
import Array "mo:base/Array";

import nft "canister:nft";

// TODO: find a way to use nft actor without influencing the deployed nft canister, since we are not using a class for nft anymore
actor Tests {
  func initNFT(auctionPrincipal: Principal) : async () {
    Debug.print("Initializing NFT handler");
    switch (await nft.init(auctionPrincipal)) {
      case (#err(_)) throw Error.reject("Handler initialization");
      case (ok) {};
    };
  };

  func testMint(creator: Principal) : async () {
    Debug.print("TESTING: token mint");
    let mockData = Blob.fromArray([0, 0]);
    switch (await nft.mint({ payload = mockData; contentType = ""; isPrivate = false; owner = ?creator })) {
      case (#err(_)) throw Error.reject("First token mint");
      case (#ok(firstId)) {
        switch (await nft.mint({ payload = mockData; contentType = ""; isPrivate = false; owner = ?creator })) {
          case (#err(_)) throw Error.reject("Second token mint");
          case (#ok(secondId)) {
            switch (await nft.getOwnerOf(firstId)) {
              case (#ok(tokenOwner)) assert(tokenOwner == creator);
              case (#err(error)) throw Error.reject("Error while getting token owner");
            };
            switch (await nft.getOwnerOf(secondId)) {
              case (#ok(tokenOwner)) assert(tokenOwner == creator);
              case (#err(error)) throw Error.reject("Error while getting token owner");
            };
            switch (await nft.getBalanceOf(creator)) {
              case (#ok(balance)) {
                let addedIds = Array.filter<Text>(balance, func (id) { id == firstId or id == secondId });
                assert(addedIds.size() == 2 and addedIds[0] != addedIds[1]);
              };
              case (#err(error)) throw Error.reject("Balance not present after mint");
            };
          };
        }
      };
    };
    Debug.print("PASSED: token mint");
  };

  // this function should be called right after testMint
  func testTransfer(sender : Principal, receiver : Principal) : async () {
    Debug.print("TESTING: token transfer");
    switch (await nft.getBalanceOf(sender)) {
      case(#err(_)) throw Error.reject("Sender balance not present before transfer");
      case (#ok(senderBalanceBefore)) {
        switch (await nft.getBalanceOf(receiver)) {
          case (#err(_)) throw Error.reject("Receiver balance not present before transfer");
          case (#ok(receiverBalanceBefore)) {
            let senderBalanceSizeBefore : Int = senderBalanceBefore.size();
            let receiverBalanceSizeBefore : Int = receiverBalanceBefore.size();
            assert(senderBalanceSizeBefore > 1);

            let sentTokenId = senderBalanceBefore[0];
            ignore await nft.transfer(receiver, sentTokenId);

            // check new receiver balance
            switch (await nft.getBalanceOf(receiver)) {
              case (#ok(balance)) {
                assert(balance.size() == receiverBalanceSizeBefore + 1);
                let foundId = Array.find<Text>(balance, func(id) { id == sentTokenId });
                if (foundId == null) {
                  throw Error.reject("Token not found in receiver balance after transfer");
                }
              };
              case(#err(_)) throw Error.reject("Receiver balance not present after transfer");
            };

            // check new sender balance
            switch (await nft.getBalanceOf(sender)) {
              case (#ok(balance)) {
                assert(balance.size() == senderBalanceSizeBefore - 1);
                let foundId = Array.find<Text>(balance, func(id) { id == sentTokenId });
                if (foundId != null) {
                  throw Error.reject("Token found in sender balance after transfer");
                }
              };
              case (#err(_)) throw Error.reject("Sender balance not present after transfer");
            };

            // check sent token ownership
            switch (await nft.getOwnerOf(sentTokenId)) {
              case (#ok(tokenOwner)) assert(tokenOwner == receiver);
              case (#err(error)) throw Error.reject("Error while getting token owner");
            };
          };
        };
      };
    };

    Debug.print("PASSED: token transfer");
  };

  public shared({caller}) func run(transferTo : Principal) : async () {
    await initNFT(caller);

    await testMint(caller);
    await testTransfer(caller, transferTo);

    Debug.print("Tests passed!");
  };
};
