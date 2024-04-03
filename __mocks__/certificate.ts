import { userProfile } from "./userProfile";

export const mockMinting = {
    tx: "tx",
    blockNumber: 67890,
    contract: "contract",
    from: "from",
    receiver: "receiver",
    tokenURI: "token",
    tokenId: "tokenId",
    type: "type"
}

export const mockCertificate = {
    id: "id",
  ref: "ref",
  created_at: "created_at",
  updated_at: "updated_at",
  metadata: {},
  answer: "answer",
  user_id: "user_id",
  course: "course",
  type: "type",
  community: {},
  entity: "entity",
  timestamp: 2345678,
  description: "description",
  submission: {},
  minting: mockMinting,
  user: userProfile
}