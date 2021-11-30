SHELL := /bin/bash

PRINCIPAL := principal \"$(shell dfx identity get-principal)\"
BACKEND_PRINCIPAL = principal \"$(shell dfx canister --no-wallet id backend)\"

fungibleToken:
	dfx build fungibleToken
	dfx canister --no-wallet install fungibleToken --argument="(\"Logo\", \"Veiling Coin\", \"VLG\", 3, 1000000000000000, ${BACKEND_PRINCIPAL}, 0)" --mode=upgrade

nft:
	dfx build nft
	dfx canister --no-wallet install nft --argument="(${PRINCIPAL})" --mode=upgrade

backend:
	dfx build backend
	dfx canister --no-wallet install backend --mode=upgrade

test:
	dfx build test
	dfx canister --no-wallet install test --mode=upgrade

frontend:
	dfx build frontend
	dfx canister --no-wallet install frontend --mode=upgrade

# For some reason it can't get the backend id the first time, so just call it twice
deploy:
	dfx canister --no-wallet create --all
	dfx build
	dfx canister --no-wallet install backend --mode=reinstall
	dfx canister --no-wallet install fungibleToken --mode=reinstall
	dfx canister --no-wallet install nft --mode=reinstall
	dfx canister --no-wallet install test --mode=reinstall
	dfx canister --no-wallet install frontend --mode=reinstall
	dfx canister --no-wallet call nft init "(${BACKEND_PRINCIPAL})"
	dfx canister --no-wallet call fungibleToken init "(${BACKEND_PRINCIPAL})"
