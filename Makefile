SHELL := /bin/bash

BACKEND_PRINCIPAL = principal \"$(shell dfx canister id backend)\"

scripts-permissions:
	chmod 774 scripts/

download-ledger:
	scripts/download-ledger.sh

download-identity:
	scripts/download-identity.sh

nft:
	dfx build nft
	dfx canister install nft --mode=upgrade

backend:
	dfx build backend
	dfx canister install backend --mode=upgrade

test:
	dfx build test
	dfx canister install test --mode=upgrade

frontend:
	dfx build frontend
	dfx canister install frontend --mode=upgrade

# - call `dfx identity new minter` before running this command
# - set `"candid": "ledger.private.did"` in .dfx.json before running this command
# - set `"candid": "ledger.public.did"` in .dfx.json after running this command
ledger:
	scripts/deploy-ledger.sh

identity:
	scripts/deploy-identity.sh

create:
	dfx canister create --no-wallet --all

deploy:
	dfx build
	dfx canister install backend
	dfx canister install nft
	dfx canister install frontend
	dfx canister call nft init "(${BACKEND_PRINCIPAL})"

upgrade:
	dfx build
	dfx canister install backend --mode=upgrade
	dfx canister install nft --mode=upgrade
	dfx canister install frontend --mode=upgrade
