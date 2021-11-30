module {
  
  // TODO: look if there is a way to join with NFT error type instead of copy/pasting variants
  public type Error = {
    #Unauthorized;
    #NotFound;
    #NotInitialized;
    #NotAllowed;
    #InvalidRequest;
    #AuthorizedPrincipalLimitReached : Nat;
    #Immutable;
    #FailedToWrite : Text;
  };

  public type MintPayload = {
    payload : Blob;
    contentType : Text;
    isPrivate : Bool;
    owner : ?Principal;
  };
}