import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { ActorSubclass } from "@dfinity/agent";

import { auth } from "../utils";
import { initAuthClient, login, logout, useAuthState } from "../store";
import { _SERVICE as BackendService } from "../../../declarations/backend/backend.did";
import { _SERVICE as NFTService } from "../../../declarations/nft/nft.did";
import { _SERVICE as FungibleTokenService } from "../../../declarations/fungibleToken/fungibleToken.did";

interface UseAuthReturn {
  login: () => void;
  logout: () => void;
  isAuthenticated: boolean;
  initialized: boolean;
  principalId?: string;
  backend: ActorSubclass<BackendService>;
  nft: ActorSubclass<NFTService>;
  fungibleToken: ActorSubclass<FungibleTokenService>;
}

export const useAuth = (): UseAuthReturn => {
  const dispatch = useDispatch();
  const { initialized, isAuthenticated } = useAuthState();

  useEffect(() => {
    const init = async () => {
      const isAuth = await auth.init();
      dispatch(initAuthClient(isAuth));
    };
    if (!auth.client) init();
  }, [dispatch]);

  const handleLogin = useCallback(() => {
    auth.login(() => dispatch(login()));
  }, [dispatch]);

  const handleLogout = useCallback(() => {
    auth.logout(() => dispatch(logout()));
  }, [dispatch]);

  return {
    login: handleLogin,
    logout: handleLogout,
    isAuthenticated,
    initialized,
    principalId: auth.client?.getIdentity().getPrincipal().toString(),
    backend: auth.backend,
    nft: auth.nft,
    fungibleToken: auth.fungibleToken,
  };
};
