import { Submission, User } from "./bounty";
import { Challenge, Metadata, Reward } from "./course";

export interface Community {
  id: string;
  ref: string;
  created_at: Date;
  updated_at: Date;
  summary: string;
  icon: string;
  name: string;
  image: string;
  colors: Colors;
  slug: string;
  active: boolean;
  description: string;
  metadata: Omit<Metadata, "bestSubmissions">;
  timestamp: number;
  rewards: Reward[];
  reward: Reward;
  courses: number;
  challenges: number;
  duration: number;
  items?: any[];
  challenge: Challenge;
  submission: Submission;
  can_mint_certificates: boolean;
}

export interface Colors {
  textAccent: string;
  text: string;
  accent: string;
  primary: string;
  secondary: string;
  highlight: string;
  muted: string;
  cover: {
    text: string;
    accent: string;
    primary: string;
    background: string;
  };
}
interface ReferralSubmission extends Submission {
  challengeData: Challenge,
  link: string
}
interface UserReferral extends User {
  submissions: ReferralSubmission[]
}
export interface Referral {
  id: string;
  name: string;
  ref: string;
  created_at: Date;
  updated_at: Date;
  title: string;
  community: Community;
  timestamp: number;
  reward: Reward;
  challenge: Challenge;
  submissions: Submission[];
  rewarded: boolean;
  metadata?: {
    reward: Reward;
  };
  user: UserReferral;
}
