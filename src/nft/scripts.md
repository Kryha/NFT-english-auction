**INIT**
> 
>`dfx canister call nft init '(vec {principal "<YOUR PRINCIPAL ID>"}, record {name = "<YOUR NAME>"; symbol = "<YOUR SYMBOL>"})'`

>`dfx canister call nft init '(vec {principal "mspfb-xrz3v-l37va-ei6xe-qg7j3-rudby-7em5j-zgm3d-f4hf3-z5to4-bae"}, record {name = "CLOS"; symbol = "🥚"})'`

**MINT**
> ``
dfx canister call nft mint "(record{
    contentType = \"meme\";
    payload     = vec{ 0x00 };
    owner       = null;
    properties  = vec{};
    isPrivate   = false;
})"
``

**GET OWNER OF**
>`dfx canister call nft getOwnerOf "(\"0\")"`

