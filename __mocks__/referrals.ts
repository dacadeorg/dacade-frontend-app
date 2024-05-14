import { Referral, UserReferral } from "@/types/community";
import { submission } from "./submission";
import { community } from "./community";
import { mockUser } from "./user";
import { challenge } from "./challenge";


const referralSubmission = Object.assign(submission, { challengeData: challenge, link: "referral-link" });
const userReferral: UserReferral = Object.assign(mockUser, { submissions: [referralSubmission] });

export const mockReferral: Referral = {
  id: "",
  name: "",
  ref: "",
  created_at: new Date("2022-05-01T12:00:00Z"),
  updated_at: new Date("2022-05-01T12:00:00Z"),
  title: "",
  community: community,
  timestamp: 0,
  reward: {
    id: "",
    ref: "",
    created_at: new Date("2022-05-01T12:00:00Z"),
    updated_at: new Date("2022-05-01T12:00:00Z"),
    challenge: "",
    type: "",
    community: "",
    token: "",
    stable: false,
    fiatCurrency: undefined,
    amount: 0,
    timestamp: 0,
    distribution: undefined,
  },
  challenge: challenge,
  submissions: [],
  rewarded: false,
  user: userReferral,
};