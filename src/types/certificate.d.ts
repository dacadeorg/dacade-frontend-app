import { Submission, User } from "./bounty";
import { Community } from "./community";
import { Metadata } from "./course";

export interface Certificate {
  id: string;
  ref: string;
  created_at: string;
  updated_at: string;
  metadata: Metadata;
  answer: string;
  user_id: string;
  course: string;
  type: string;
  community: Community;
  entity: string;
  timestamp: number;
  description: string;
  submission: Submission;
  minting: Minting;
  user: User;
}

/**
 * type for what is returned after certificate mintin
 *
 * @date 10/26/2023 - 4:43:36 PM
 *
 * @export
 * @interface Minting
 * @typedef {Minting}
 */
export interface Minting {
  tx: string;
  blockNumber: number;
  timestamp: number;
  contract: string | null;
  from?: string;
  receiver?: string;
  tokenURI: string;
  tokenId: string;
  type?: string;
}
