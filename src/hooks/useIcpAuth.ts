import { canisterId, createActor } from "@/utilities/icp/issuerFactory";
import { Identity } from "@dfinity/agent";
import { AuthClient } from "@dfinity/auth-client";
import { Principal } from "@dfinity/principal";
import { useCallback, useEffect } from "react";

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
    issuerCanister: any;
  }
}

export const MAX_TTL = BigInt(7 * 24 * 60 * 60 * 1000 * 1000 * 1000);

/**
 * For production ready we shall use https://identity.ic0.app/ as identity provider
 */
export const IDENTITY_PROVIDER = "https://identity.ic0.app/";
const useIcpAuth = () => {
  useEffect(() => {
    if (!window) return;
    async function initializeContract() {
      const authClient = await AuthClient.create();
      window.auth = {} as any;
      window.auth.client = authClient;
      window.auth.isAuthenticated = await authClient.isAuthenticated();
      window.auth.identity = authClient.getIdentity();
      window.auth.principal = authClient.getIdentity()?.getPrincipal();
      window.auth.principalText = authClient.getIdentity()?.getPrincipal().toText();
      window.issuerCanister = createActor(canisterId ?? "", {
        agentOptions: {
          host: "https://icp0.io",
          identity: authClient.getIdentity(),
        },
      });
    }

    initializeContract();
  }, []);

  const popupCenter = useCallback((): string | undefined => {
    const AUTH_POPUP_WIDTH = 576;
    const AUTH_POPUP_HEIGHT = 625;

    if (typeof window === "undefined" || !window.top) {
      return undefined;
    }

    const { innerWidth, innerHeight, screenX, screenY } = window;

    const y = innerHeight / 2 + screenY - AUTH_POPUP_HEIGHT / 2;
    const x = innerWidth / 2 + screenX - AUTH_POPUP_WIDTH / 2;

    return `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=no, copyhistory=no, width=${AUTH_POPUP_WIDTH}, height=${AUTH_POPUP_HEIGHT}, top=${y}, left=${x}`;
  }, []);

  async function login(callback: (principal: string) => void) {
    if (!window) return;
    const authClient = window.auth.client;

    const isAuthenticated = await authClient.isAuthenticated();
    if (!isAuthenticated) {
      await authClient?.login({
        maxTimeToLive: MAX_TTL,
        identityProvider: IDENTITY_PROVIDER,
        windowOpenerFeatures: popupCenter(),
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
