git clone git@github.com:dfinity/ic.git ../ic

cd ../ic/rs/rosetta-api
./build-ledger.sh

cd ../../../veiling

cp ../ic/rs/target/wasm32-unknown-unknown/release/ledger-canister-min.wasm ./ledger.wasm
cp ../ic/rs/rosetta-api/ledger.did ./ledger.private.did 
cp ../ic/rs/rosetta-api/ledger_canister/ledger.did ./ledger.public.did
