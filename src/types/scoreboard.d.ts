import { User } from "./bounty";

export interface Scoreboard {
  id: string;
  ref: string;
  created_at: string;
  updated_at: string;
  score: number;
  user_id: string;
  submissions: number;
  submissionPoints: number;
  feedbacks: number;
  type: string;
  entity: string;
  feedbackPoints: number;
  timestamp: number;
  user: User;
  [key: string]: any;
}

export interface Metadata {
  reputation: Reputation;
}

export interface Reputation {
  total: number;
  list: { [key: string]: number };
}
