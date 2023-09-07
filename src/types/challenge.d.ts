import { User } from "./bounty";
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
  teamInvites?: Invite[];
  teamMembers?: TeamMember[];
  members?: TeamMember[];
  ref: string;
  timestamp: string;
  updated_at: string;
  members: TeamMember[];
}

export interface Invite {
  created_at: string;
  id: string;
  ref: string;
  status: string;
  team_ref: string;
  timestamp: number;
  updated_at: string;
  user: User;
  user_id: string;
  team?: Team;
}

/**
 * Interface for member of a team in team challenges
 * @date 7/27/2023 - 5:26:50 PM
 *
 * @export
 * @interface TeamMember
 * @typedef {TeamMember}
 */
export interface TeamMember {
  created_at: string;
  id: string;
  joined_on: string;
  ref: string;
  team_ref: string;
  timestamp: number;
  updated_at: string;
  user: User;
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
