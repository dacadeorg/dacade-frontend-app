import { Metadata } from "./course";

export interface Notification {
  id: string;
  ref: string;
  created_at: string | Date;
  updated_at: string | Date;
  metadata: Metadata;
  user_id: string;
  link: string;
  message: string;
  read: boolean;
  timestamp: number;
  type: string;
}
