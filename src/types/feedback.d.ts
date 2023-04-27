import { User } from "./bounty";

export type Feedback = {
  id: string;
  ref: string;
  created_at: string;
  updated_at: string;
  criteria: string[];
  positive: boolean;
  name: string;
  challenge: string;
  timestamp: timestamp;
  description?: string;
  user: User,
  ranking: number;
  text: string;
  metadata?: {
    evaluation?: {
      reward: string;
      points: number;
    };
    language: "en" | "fr";
  };
  link?: string;
};
