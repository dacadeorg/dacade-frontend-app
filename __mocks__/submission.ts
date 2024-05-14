import { Submission } from "@/types/bounty";
import { community } from "./community";
import { reward } from "./reward";
import { mockUser } from "./user";
import { challenge } from "./challenge";

export const submission: Submission = {
    length: 0,
    id: "submission_id",
    ref: "reference",
    created_at: new Date("2022-05-01T12:00:00Z"),
    updated_at: new Date("2022-05-01T12:00:00Z"),
    link: "/submissions/reference",
    community: community,
    user_id: "user_id",
    challenge: challenge,
    text: "Submission",
    reviewDeadline: new Date(),
    metadata: {
      evaluation: "",
      applicableReward: {
        ref: "",
        amount: 0,
        updated_at: "",
        challenge: "",
        created_at: "",
        id: "",
        type: "",
        community: "",
        timestamp: 0,
        token: "",
      },
      reviewed: false,
      feedbacks: 0,
      language: "",
    },
    timestamp: 0,
    user: mockUser,
    reviewable: false,
    status: "",
    reward: reward,
    map: function () {
      throw new Error("Function not implemented.");
    },
  };