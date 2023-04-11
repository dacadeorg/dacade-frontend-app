export interface Notification {
  id: string;
  ref: string;
  created_at: string;
  updated_at: string;
  metadata: Metadata;
  user_id: string;
  link: string;
  message: string;
  read: boolean;
  timestamp: number;
}

export interface Metadata {
  username: string;
}
