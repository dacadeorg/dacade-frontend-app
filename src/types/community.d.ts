// Those types are temporary
// TODO: Should be improved with the extact types
import { Metadata, Reward } from "./course";

export interface Community {
  id: string;
  ref: string;
  created_at: Date;
  updated_at: Date;
  summary: string;
  icon: string;
  name: string;
  colors: Colors;
  slug: string;
  active: boolean;
  description: string;
  metadata: Omit<Metadata, "bestSubmissions">;
  timestamp: number;
  rewards: Reward[];
  courses: number;
}

export interface Colors {
  textAccent: string;
  text: string;
  accent: string;
  primary: string;
}
