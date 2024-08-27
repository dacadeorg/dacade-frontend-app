import { Identity } from "@dfinity/agent";
import { AuthClient } from "@dfinity/auth-client";
import { Principal } from "@dfinity/principal";
import { useEffect } from "react";

type Auth = {
  client: AuthClient;
  isAuthenticated: boolean;
  identity: Identity;
  principal: Principal;
  principalText: string;
};

declare global {
  interface Window {
    auth: Auth;
    canister: any;
  }
}

export const MAX_TTL = BigInt(7 * 24 * 60 * 60 * 1000 * 1000 * 1000);

/**
 * For production ready we shall use https://identity.ic0.app/ as identity provider
 */
export const IDENTITY_PROVIDER = "http://bd3sg-teaaa-aaaaa-qaaba-cai.localhost:4943";
const useIcpAuth = () => {
  useEffect(() => {
    if (!window) return;
    async function initializeContract() {
      const authClient = await AuthClient.create();
      window.auth = {} as any;
      window.canister = {};
      window.auth.client = authClient;
      window.auth.isAuthenticated = await authClient.isAuthenticated();
      window.auth.identity = authClient.getIdentity();
      window.auth.principal = authClient.getIdentity()?.getPrincipal();
      window.auth.principalText = authClient.getIdentity()?.getPrincipal().toText();
    }

    initializeContract();
  }, []);

  async function login(callback: (principal: string) => void) {
    if (!window) return;
    const authClient = window.auth.client;

    const isAuthenticated = await authClient.isAuthenticated();
    console.log({ isAuthenticated });
    if (!isAuthenticated) {
      await authClient?.login({
        maxTimeToLive: MAX_TTL,
        identityProvider: IDENTITY_PROVIDER,
        onSuccess: async () => {
          window.auth.isAuthenticated = await authClient.isAuthenticated();
          const principal = await authClient.getIdentity()?.getPrincipal().toText();
          callback(principal);
        },
      });
    } else {
      const principal = await authClient.getIdentity()?.getPrincipal().toText();
      callback(principal);
    }
  }

  async function logout() {
    if (!window) return;
    const authClient = window.auth.client;
    authClient.logout();
  }

  return {
    login,
    logout,
  };
};

export default useIcpAuth;
