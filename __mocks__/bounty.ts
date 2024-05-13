import { Submission } from "@/types/bounty";
import { community } from "./community";
import { challenge } from "./course";
import { reward } from "./reward";
import { ReactNode } from "react";

export const mockTrailer = {
  summary: "trailer summary",
  description: "trailer descriptio",
  video: "trailer video",
  duration: 4,
  info: {
    items: ["item 1", "item 2"],
    title: "info title",
  },
};

export const mockSubmission: Submission = {
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
  user: {
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
    kycStatus: "",
  },
  reviewable: false,
  status: "",
  reward: reward,
  map: function (): ReactNode {
    throw new Error("Function not implemented.");
  }
};
