import { Actor, HttpAgent, HttpAgentOptions } from "@dfinity/agent";

import { idlFactory } from "./issuer.did";

export const canisterId = process.env.NEXT_PUBLIC_ISSUER_CANISTER_ID;

type ActorOptions = {
  agent?: any;
  agentOptions?: HttpAgentOptions | any;
  actorOptions?: any;
};

export const createActor = (canisterId: string, options: ActorOptions = {}) => {
  const agent = options.agent || new HttpAgent({ ...options.agentOptions });

  // Creates an actor with using the candid interface and the HttpAgent
  return Actor.createActor(idlFactory, {
    agent,
    canisterId,
    ...(options ? options.actorOptions : {}),
  });
};

/**
 * A ready-to-use agent for the issuer canister
 * @type {import("@dfinity/agent").ActorSubclass<import("./issuer.did.js")._SERVICE>}
 */

if (!canisterId) {
  throw new Error("Canister id is not found");
}
