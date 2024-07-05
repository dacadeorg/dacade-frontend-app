import { KYCSTATUS } from "@/store/feature/kyc.slice";
import { User } from "@/types/bounty";
import { Notification } from "@/types/notification";
import { mockMetadata } from "./community";

export const mockUser: User = {
  id: "user_id",
  ref: "ref",
  created_at: new Date("2022-05-01T12:00:00Z"),
  firstName: "John Doe",
  displayName: "John Doe",
  uid: "uuid-uuido-232-dex0232-2331",
  joined: "14 days ago",
  disabled: false,
  reputation: 0,
  username: "",
  lastName: "",
  emailVerified: false,
  email: "",
  kycStatus: KYCSTATUS.PENDING,
  avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
};

export const mockNotification: Notification = {
  id: "",
  ref: "",
  created_at: new Date(),
  updated_at: new Date(),
  metadata: mockMetadata,
  user_id: mockUser.id,
  link: "",
  message: "",
  read: false,
  timestamp: 0,
  type: "submission",
};
