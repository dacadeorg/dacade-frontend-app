import { KYCSTATUS } from "@/store/feature/kyc.slice";
import { mockReferral } from "./referrals";

export const mockUser = {
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
    referrals: mockReferral
  }