import { Referral, UserReferral } from "@/types/community";
import { mockCommunity as community } from "./community";
import { challenge, submission as getMockSubmission } from "./challenge";
import { reward } from "./reward";
import { mockUser } from "./user";


const referralSubmission = () => Object.assign(getMockSubmission, { challengeData: challenge, link: "referral-link" });
const userReferral: UserReferral = Object.assign(mockUser, { submissions: [referralSubmission()] });

export const mockReferral: Referral = {
    id: "",
    name: "",
    ref: "",
    created_at: new Date("2022-05-01T12:00:00Z"),
    updated_at: new Date("2022-05-01T12:00:00Z"),
    title: "test referral",
    community,
    timestamp: 0,
    reward: reward,
    challenge: challenge,
    submissions: [getMockSubmission],
    rewarded: false,
    user: userReferral,
};