import { Course, Metadata } from "./course";

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

export interface Colors {
  textAccent: string;
  accent: string;
  text: string;
  primary: string;
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

export interface Submission {
  length: Submission | undefined;
  map(
    arg0: (submission: any) => JSX.Element
  ): import("react").ReactNode;
  id: string;
  ref: string;
  created_at: string;
  updated_at: string;
  link: string;
  community: string;
  user_id: string;
  challenge: string;
  text: string;
  reviewDeadline: number;
  metadata: SubmissionMetadata;
  timestamp: number;
  user: User;
  reviewable: boolean;
  status: string;
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
  avatar?: string;
  metadata?: UserMetadata;
  discordConnected?: boolean;
}

export interface UserMetadata {
  reputation: Reputation;
}

export interface Reputation {
  total: number;
  list: string[];
}

export interface BountyAuthor {
  description: string;
  name: string;
}

export interface Reward {
  id: string;
  ref: string;
  created_at: string;
  updated_at: string;
  type: RewardType;
  community: string;
  token: string;
  challenge: string;
  amount: number;
  stable?: boolean;
  timestamp: number;
}

export enum RewardType {
  submission = "SUBMISSION",
}
