import { Feedback } from "@/types/feedback";
import { fixtureSubmission, fixtureUser } from "./challenge";
import { reward } from "./reward";

export const fixtureFeedback: Feedback = {
  submission: fixtureSubmission(),
  id: "feedback id",
  ref: "feedback ref",
  created_at: new Date("2022-05-01T12:00:00Z"),
  updated_at: "wednesday",
  criteria: ["feedback 1", "feedback 2", "feedback 3"],
  positive: true,
  name: "mima",
  challenge: "TypeScript",
  timestamp: 4,
  description: "feedback description",
  user: fixtureUser(),
  ranking: 3,
  text: "feedback text",
  metadata: {
    evaluation: {
      reward: reward,
      points: 8,
    },
    language: "en",
  },
  link: "/feedback"
};