import { Challenge } from "@/types/course";
import { Format, mockCertificateData, mockCourse, mockLearningModule, mockRatingCriteria } from "./course";
import { community, metadata } from "./community";
import { reward } from "./reward";
import { mockUser } from "./user";

export const challenge: Challenge = {
  id: "challenge",
  ref: "challenge ref",
  created_at: new Date("2022-05-01T12:00:00Z"),
  updated_at: new Date("2022-05-01T12:00:00Z"),
  hint: "Hint",
  name: "challenge name",
  format: Format,
  description: "challenge description",
  course: mockCourse,
  type: "course",
  isTeamChallenge: false,
  objectives: ["objectives 1", "Objectives 2", "Objectives 3", "Objectives 4"],
  threshold: 8,
  community: community,
  reviewTime: 9,
  metadata: metadata,
  level: 58,
  courses: [mockCourse],
  learningModules: [mockLearningModule],
  expiresAt: "2025",
  reward: reward,
  certificateIcon: "certificate",
  certificateData: mockCertificateData,
  ratingCriteria: [mockRatingCriteria],
  timestamp: 6,
  maxPoints: 299,
  minPoints: 9,
  rewards: [reward],
  feedbacks: {},
  feedbackInfo: [{}],
  bestSubmissions: [{}],
  teamLimit: 5,
  isHackathon: false,
};

export const mockInvite = {
  created_at: "tuesday",
  id: "invite",
  ref: "invitation ref",
  status: "invitation status",
  team_ref: "team reference",
  timestamp: 3,
  updated_at: "wednesday",
  user: mockUser,
  user_id: "user id",
}