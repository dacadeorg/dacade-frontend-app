import { Challenge, Course, Metadata, Reward } from "./course";
import { Colors } from "./community";
import { ReactNode } from "react";
import { Feedback } from "./feedback";

export interface Bounty {
  url: string;
  image: string | undefined;
  id: string;
  ref: string;
  created_at: string;
  updated_at: string;
  icon: string;
  active: boolean;
  colors: Colors;
  description: string;
  summary: string;
  name: string;
  slug: string;
  metadata: Metadata;
  timestamp: number;
  course: BountyCourse;
  challenge: string;
  reward: Reward;
  totalSubmissions?: number;
  submissions?: Submission;
  author?: BountyAuthor;
}

export interface BountyCourse extends Course {
  prerequisite?: string[];
  duration: number;
  slug: string;
  active: boolean;
  trailer?: Trailer;
  metadata?: Metadata;
  author?: CourseAuthor;
  faq?: Faq[];
  disclaimer?: string;
}

export interface Trailer {
  summary: string;
  description?: string;
  video?: string;
  duration: number;
}

export interface CourseAuthor {
  description: string;
  name: string;
}

export interface Faq {
  description: string;
  title: string;
}

/**
 * @property {string} ref - The unique identifier of the bounty.
 */
export interface Evaluation {
  evaluator: string;
  created_at: string;
  comment: string;
  criteria?: Rebric[];
  metadata: {
    language: string;
  };
  points?: number;
  totalPoints?: number;
  reward?: {
    amount: number;
    token: string;
  };
}

export interface Submission {
  length: Submission | undefined;
  /**
   *@property {function((submission: any) => JSX.Element): import("react").ReactNode} map - Applies the provided function to each element in the submission array, returning a new array of React elements.
   */
  map(arg0: (submission: Submission) => JSX.Element): ReactNode;
  id: string;
  ref: string;
  created_at: string;
  updated_at: string;
  link: string;
  community: string;
  user_id: string;
  challenge: Challenge;
  text: string;
  reviewDeadline: Date;
  metadata: SubmissionMetadata;
  timestamp: number;
  user: User;
  reviewable: boolean;
  status: string;
  evaluation?: Evaluation;
  reward: Reward;
  // TODO: to be strictly typed later
  evaluation: any;
}

export interface SubmissionMetadata {
  evaluation: any;
  applicableReward: ApplicableReward;
  reviewed: boolean;
  feedbacks: number;
  language: string;
}

export interface ApplicableReward {
  ref: string;
  amount: number;
  updated_at: string;
  challenge: string;
  created_at: string;
  id: string;
  type: string;
  community: string;
  timestamp: number;
  token: string;
  stable?: boolean;
}

export interface User {
  id: string;
  ref: string;
  created_at: string;
  displayName: string;
  uid: string;
  joined: string;
  disabled: boolean;
  reputation: number;
  username: string;
  emailVerified: boolean;
  email: string;
  avatar?: string;
  metadata?: UserMetadata;
  discordConnected?: boolean;
  isKycVerified?: boolean;
  feedbacks?: Feedback;
  discord?: {
    connected?: boolean;
  };
}

export interface UserMetadata {
  reputation: Reputation;
}

export interface Reputation {
  id: Key | null | undefined;
  total: number;
  list: string[];
  community: Community;
  score: number;
}

export interface BountyAuthor {
  description: string;
  name: string;
}
