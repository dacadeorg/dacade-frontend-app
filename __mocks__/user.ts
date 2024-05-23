import { KYCSTATUS } from "@/store/feature/kyc.slice";
import { User } from "@/types/bounty";
import { Notification } from "@/types/notification";
import { metadata } from "./community";

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
};

export const mockNotification: Notification = {
    id: "",
    ref: "",
    created_at: new Date(),
    updated_at: new Date(),
    metadata: metadata,
    user_id: mockUser.id,
    link: "",
    message: "",
    read: false,
    timestamp: 0,
    type: "submission"
}