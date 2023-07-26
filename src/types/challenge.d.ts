import { User } from "firebase/auth";
import { Challenge } from "./course";

export type RatingCriteria = {
  name: string;
  order: number;
  rubric: Rubric[];
  maxPoints: number;
};

export interface Team {
  challenge?: Challenge;
  challenge_ref: string;
  created_at: string;
  id: string;
  locked: boolean;
  name: string;
  organizer?: User;
  organizer_id: string;
  teamMembers?: User[];
  ref: string;
  timestamp: string;
  updated_at: string;
}

/**
 * Interface for the member seaarch input
 * @date 7/26/2023 - 6:13:59 PM
 *
 * @interface SelectOption
 * @typedef {SelectOption}
 */

export interface NewTeamOption {
  challenge_id?: string;
  name: string;
  members?: string[];
}
