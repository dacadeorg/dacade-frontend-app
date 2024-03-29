import { Submission, User } from "./bounty";
import { Reward } from "./course";

export type Feedback = {
  submission: Submission;
  id: string;
  ref: string;
  created_at: Date;
  updated_at: string;
  criteria: string[];
  positive: boolean;
  name: string;
  challenge: string;
  timestamp: timestamp;
  description?: string;
  user: User;
  ranking: number;
  text: string;
  metadata?: {
    evaluation?: {
      reward: Reward;
      points: number;
    };
    language: "en" | "fr";
  };
  link?: string;
};
