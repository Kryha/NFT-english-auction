dfx canister call backend newAuction "(record{
  name = \"Guernica\";
  description = \"Guernica is a large 1937 oil painting on canvas by Spanish artist Pablo Picasso. It is one of his best-known works, regarded by many art critics as the most moving and powerful anti-war painting in history. It is exhibited in the Museo Reina Sofía in Madrid.\";
  startPrice = 2000.00;
  minIncrement = 200.00;
  durationInDays = 10;
  buyNowPrice = 2000000.00;
})"
