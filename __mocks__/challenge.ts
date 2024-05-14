import { Challenge } from "@/types/course";
import { mockCourse, mockLearningModule, mockRatingCriteria } from "./course";
import { reward } from "./reward";
import { mockMetadata } from "./metaData";

const mockChallenge: Challenge = {
  id: "challenge",
  ref: "challenge ref",
  created_at: new Date("2022-05-01T12:00:00Z"),
  updated_at: new Date("2022-05-01T12:00:00Z"),
  hint: "Hint",
  name: "challenge name",
  format: {
    githubLink: true,
    text: true,
    disclaimer: true,
  },
  description: "challenge description",
  course: mockCourse,
  type: "course",
  isTeamChallenge: false,
  objectives: ["objectives 1", "Objectives 2", "Objectives 3", "Objectives 4"],
  threshold: 8,
  reviewTime: 9,
  metadata: mockMetadata,
  level: 58,
  courses: [mockCourse],
  learningModules: [mockLearningModule],
  expiresAt: "2025",
  reward: reward,
  certificateIcon: "certificate",
  certificateData: {
    narrative: "course certificate",
    icon: "certificate icon",
  },
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

const mockInvite = {
    created_at: "tuesday",
    id: "invite",
    ref: "invitation ref",
    status: "invitation status",
    team_ref: "team reference",
    timestamp: 3,
    updated_at: "wednesday",
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
        kycStatus: "PENDING",
      },
    user_id: "user id",
  }


export {mockChallenge, mockInvite}