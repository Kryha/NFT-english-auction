import { ActorSubclass } from "@dfinity/agent";
import { AuthClient } from "@dfinity/auth-client";

import { backend, createActor as createBackendActor } from "../../../declarations/backend";
import { nft, createActor as createNFTActor } from "../../../declarations/nft";
import { fungibleToken, createActor as createFungibleTokenActor } from "../../../declarations/fungibleToken";
import { _SERVICE as BackendService } from "../../../declarations/backend/backend.did";
import { _SERVICE as NFTService } from "../../../declarations/nft/nft.did";
import { _SERVICE as FungibleTokenService } from "../../../declarations/fungibleToken/fungibleToken.did";

/**
 * Provides functionality for hanndling main authentication operations.
 * WARNING: Do not call these methods directly from a React component. Use useAuth hook instead.
 */
class Auth {
  client?: AuthClient;
  backend: ActorSubclass<BackendService> = backend;
  nft: ActorSubclass<NFTService> = nft;
  fungibleToken: ActorSubclass<FungibleTokenService> = fungibleToken;

  async init(): Promise<boolean> {
    this.client = await AuthClient.create();
    const isAuth = await this.client.isAuthenticated();
    if (isAuth) this.generateActors();
    return isAuth;
  }

  private warn() {
    console.warn("Auth client not initialized.");
  }

  private generateActors() {
    if (!this.client) return;
    const identity = this.client.getIdentity();
    this.backend = createBackendActor(String(process.env.BACKEND_CANISTER_ID), { agentOptions: { identity } });
    this.nft = createNFTActor(String(process.env.NFT_CANISTER_ID), { agentOptions: { identity } });
    this.fungibleToken = createFungibleTokenActor(String(process.env.FUNGIBLE_TOKEN_CANISTER_ID), { agentOptions: { identity } });
  }

  login(onSuccess: () => void): void {
    if (!this.client) return this.warn();
    this.client.login({
      onSuccess: () => {
        try {
          this.generateActors();
          onSuccess();
        } catch (error) {
          console.warn("Login error: ", error);
        }
      },
      identityProvider: process.env.NODE_ENV === "production" ? undefined : "http://localhost:8000?canisterId=rwlgt-iiaaa-aaaaa-aaaaa-cai",
    });
  }

  logout(onSuccess: () => void): void {
    if (!this.client) return this.warn();
    this.backend = backend;
    this.nft = nft;
    this.client.logout();
    onSuccess();
  }
}

export const auth = new Auth();
