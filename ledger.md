# Working with ledger canister

## Deployment

Follow the instructions illustrated in the README.

## Notes

- The ledger canister is deployed through the `default` account, which is granted a big amount of funds on deployment. The `transfer` function needs to be called by `default` account in order to give a specified amount of ICPs to a specified account. You can look at the required parameters for `transfer` method inside the `bid` and `closeAuction` methods. Pay attention at the fact that `from_subaccount` and `to` fields are not of type `Principal`, but of type `Blob`. You will have to retrieve that Blob by calling the backend method `getAccountId` from cli. Then you will have to call ledger method `transfer` with the required args.
- Pay attention to the TODOs inside `bid` function. Maybe we need to find a way to call ledger canister from frontend (assuming the second `transfer` call in `bid` does not work), but I couldn't find anything about this online.
- Check the files in `scripts` to check how ledger is built. Also check `Markdown`.

## Useful URLs

Look at the latest URLs pinned on dfinity dev slack channel.
