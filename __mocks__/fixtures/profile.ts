import { Certificate, Minting } from "@/types/certificate";
import { submission } from "./challenge";
import { mockMetadata, mockCommunity } from "./community";
import { Reputation } from "@/types/bounty";
import { mockUser } from "./user";

export const mockMinting: Minting = {
  tx: "",
  blockNumber: 0,
  timestamp: 0,
  contract: null,
  tokenURI: "",
  tokenId: "",
};
export const certificate: Certificate = {
  id: "123",
  ref: "commuities/123",
  created_at: "2022-05-01T12:00:00Z",
  updated_at: "2022-05-01T12:00:00Z",
  metadata: mockMetadata,
  answer: "The user certificate",
  user_id: mockUser?.id,
  course: "introduction to testing",
  type: "challenge",
  community: mockCommunity,
  entity: "none",
  timestamp: 0,
  description: "",
  submission: submission,
  minting: mockMinting,
  user: mockUser,
};

export const mockReputation: Reputation = {
  id: "123",
  total: 0,
  list: [],
  community: mockCommunity,
  score: 0,
};

export const mockProfile = {
  displayName: "Jonh Doe",
  username: "Jonh Doe",
  avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
};

export const userIcon = "https://dacade.org/img/communities/sui.svg";
