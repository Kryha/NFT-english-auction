import Event "mo:nft/event";
import Hubs "mo:nft/main";
import Int "mo:matchers/Testable";
import NFTTypes "mo:nft/types";
import Result "mo:base/result";
import Token "mo:nft/token";
import Principal "mo:base/Principal";
import Debug "mo:base/Debug";
import Text "mo:base/Text";
import Util "util";

import T "types";

actor NFTHandler {
  type Result<T, E> = Result.Result<T, E>;
  type Error = T.Error;

  stable var hub : ?Hubs.Hub = null;
  stable var admin : ?Principal = null;
  stable var auctionController : ?Principal = null;

  public shared({caller}) func init(auction: Principal) : async Result<(), Error> {
    switch (hub) {
      case (?h) #err(#NotAllowed);
      case (null) {
        admin := ?caller;
        auctionController := ?auction;
        let h = await Hubs.Hub();
        await h.init([caller], { name = "kryha"; symbol = "kr4" });
        hub := ?h;
        #ok()
      };
    }
  };

  // To use this from command line call:
  // dfx canister call nft mint "(record{payload = vec{0x00}; contentType = \"\"; isPrivate = false})"
  //
  // To call it from the client use the following:
  //
  // const [tokenId, setTokenId] = useState("");
  // const handleMint = async () => {
  //     const res = await nft.mint({ payload: [0, 0, 0], contentType: "", isPrivate: false });
  //     if ("ok" in res) setTokenId(res.ok);
  // };
  //
  // Note: You must be authenticated.
  public shared({caller}) func mint(payload : T.MintPayload) : async Result<Text, Error> {
    var tokenOwner = caller;
    if (not Util.isAuth(caller)) return #err(#Unauthorized);

    switch (payload.owner) {
      case (null) {};
      case (?owner) tokenOwner := owner
    };
    switch (hub) {
      case (null) #err(#NotInitialized);
      case (?h) await h.mint({
        payload = #Payload(payload.payload);
        contentType = payload.contentType;
        isPrivate = payload.isPrivate;
        owner = ?(tokenOwner);
        properties = [];
      });
    };
  };

  // Transfers one of your own NFTs to another principal.
  public func transfer(to : Principal, id : Text) : async Result<(), Error> {
    switch (hub) {
      case (null) #err(#NotInitialized);
      case (?h) await h.transfer(to, id);
    }
  };

  public func transferToAuction(id : Text) : async Result<(), Error> {
    switch (hub) {
      case (null) #err(#NotInitialized);
      case (?h) {
        switch (auctionController) {
          case (null) #err(#NotInitialized);
          case (?auction) await h.transfer(auction, id);
        }
      }
    }
  };

  // Returns the token ids of the caller.
  public shared({caller}) func getMyBalance() : async Result<[Text], Error> {
    await getBalanceOf(caller);
  };

  // Returns the token ids of the provided principal.
  public func getBalanceOf(principal : Principal) : async Result<[Text], Error> {
    switch (hub) {
      case (null) #err(#NotInitialized);
      case (?h) #ok(await h.balanceOf(principal));
    }
  };

  public func getOwnerOf(id : Text) : async Result<Principal, Error> {
    switch (hub) {
      case (null) #err(#NotInitialized);
      case (?h) await h.ownerOf(id);
    }
  };

  public shared({caller}) func isTokenMine(id : Text): async Result<Bool, Error> {
    switch (hub) {
      case (null) #err(#NotInitialized);
      case (?h) {
        var owner = await h.ownerOf(id);
        switch (owner) {
          case (#err(error)) #err(error);
          case (#ok(nftOwner)) return #ok(caller == nftOwner);
        }
      }
    }
  };
  // Gets the token with the given identifier.
  // Note: If the token is private it checks if the caller is an owner.
  public func getToken(id : Text) : async Result<Token.PublicToken, Error> {
    switch (hub) {
      case (null) #err(#NotInitialized);
      case (?h) await h.tokenByIndex(id);
    }
  };

  public shared({caller}) func setEventCallback(callback : Event.Callback) : async Result<(), Error> {
    if (?caller != admin) return #err(#Unauthorized);
    switch (hub) {
      case (null) #err(#NotInitialized);
      case (?h) #ok(await h.updateEventCallback(#Set(callback)));
    }
  };

  public shared({caller}) func removeEventCallback() : async Result<(), Error> {
    if (?caller != admin) return #err(#Unauthorized);
    switch (hub) {
      case (null) #err(#NotInitialized);
      case (?h) #ok(await h.updateEventCallback(#Remove));
    }
  };
};
