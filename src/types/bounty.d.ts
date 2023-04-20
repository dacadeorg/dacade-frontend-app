import { Challenge, Course, Metadata, Reward } from "./course";
import { Colors, Community } from "./community";
import { ReactNode } from "react";

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

export interface Submission {
  length: Submission | undefined;
  /**
   *@property {function((submission: any) => JSX.Element): import("react").ReactNode} map - Applies the provided function to each element in the submission array, returning a new array of React elements.
   */
  map(arg0: (submission: Submission) => JSX.Element): ReactNode;
  id: string;
  ref: string;
  created_at: Date;
  updated_at: Date;
  link: string;
  community: Community;
  user_id: string;
  challenge: string;
  text: string;
  reviewDeadline: Date;
  metadata: SubmissionMetadata;
  timestamp: number;
  user: User;
  reviewable: boolean;
  status: string;
  reward: ApplicableReward;
}

export interface SubmissionMetadata {
  evaluation: Evaluation;
  applicableReward: ApplicableReward;
  reviewed: boolean;
  feedbacks: number;
  language: string;
}

export interface ApplicableReward {
  ref: string;
  amount: number;
  updated_at: string;
  challenge: Challenge;
  created_at: string;
  id: string;
  type: Type;
  community: Community;
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
}

export interface UserMetadata {
  reputation: Reputation;
}

export interface Reputation {
  total: number;
  list: { [key: string]: number };
}

export interface BountyAuthor {
  description: string;
  name: string;
}

export enum RewardType {
  submission = "SUBMISSION",
}

export enum SubmissionType {
  feedback = "FEEDBACK",
  submission = "SUBMISSION",
}

export interface Evaluation {
  reward: EvaluationReward | null;
  score: number;
  totalPoints: number;
  points: number;
}

export interface EvaluationReward {
  amount: number;
  ref: string;
  token: string;
}
