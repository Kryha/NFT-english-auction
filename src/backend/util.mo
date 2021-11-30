import Principal "mo:base/Principal";
import Text "mo:base/Text";
import Nat64 "mo:base/Nat64";
import Float "mo:base/Float";

import Const "const";

module {
  public let eq: (Nat, Nat) -> Bool = func(a, b) { a == b };

  public func isAuth(principal: Principal) : Bool {
    Text.size(Principal.toText(principal)) == 63;
  };

  public func tokenAmountToNat(amount : Float) : Nat {
    Nat64.toNat(Nat64.fromIntWrap(Float.toInt(amount * (10 ** Float.fromInt(Const.TOKEN_DECIMALS)))));
  };

  public func tokenAmountToFloat(amount : Nat) : Float {
    Float.fromInt(amount) / (10 ** Float.fromInt(Const.TOKEN_DECIMALS));
  };

  public func tokenToDollars(tokens : Float) : Float {
    tokens * Float.fromInt(Const.DOLLARS_PER_TOKEN);
  };

  public func dollarsToToken(dollars : Float) : Float {
    dollars / Float.fromInt(Const.DOLLARS_PER_TOKEN);
  };

  public func addDays(date : Int, days : Int) : Int {
    date + (days * Const.NS_PER_DAY);
  };
}
