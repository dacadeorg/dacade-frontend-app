/**
 * This type is temporary
 * Should be updated with the right type as soon as it is available
 */

import { Community } from "./community";
import { Reward } from "./course";

export interface Refferral {
  id: string;
  ref: string;
  created_at: string;
  updated_at: string;
  title: string;
  name: string;
  community: Community;
  timestamp: number;
  reward: Reward;
}
