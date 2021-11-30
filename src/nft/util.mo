import Principal "mo:base/Principal";
import Text "mo:base/Text";

module {
  public func isAuth(principal: Principal) : Bool {
    Text.size(Principal.toText(principal)) == 63;
  };
}
