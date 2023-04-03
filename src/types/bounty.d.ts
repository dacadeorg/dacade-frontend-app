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
