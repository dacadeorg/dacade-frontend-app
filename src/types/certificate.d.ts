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
  minting: {
    tx: string;
    block: number;
    timestamp: number;
  };
}
