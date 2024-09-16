import { mockFormat, mockCertificateData, mockCourse, mockLearningModule, mockRatingCriteria } from "./course";
import { mockCommunity, mockMetadata } from "./community";
import { reward } from "./reward";
import { Evaluation, Submission } from "@/types/bounty";
import { AdditionalInfo, Challenge } from "@/types/course";
import { GRADING_CRITERIA, TEAM_FORMATION } from "@/constants/challengeInfo";
import { Team, TeamMember } from "@/types/challenge";
import { Feedback } from "@/types/feedback";
import { mockUser } from "./user";

export const mockAdditionalInfo: { [type: string]: AdditionalInfo } = {
  type: { type: "additional type", text: "additional text" },
};

export const challenge: Challenge = {
  id: "challenge",
  ref: "challenge ref",
  created_at: new Date("2022-05-01T12:00:00Z"),
  updated_at: new Date("2022-05-01T12:00:00Z"),
  hint: "Hint",
  name: "challenge name",
  format: mockFormat,
  description: "challenge description",
  course: mockCourse,
  type: "course",
  isTeamChallenge: false,
  objectives: ["objectives 1", "Objectives 2", "Objectives 3", "Objectives 4"],
  threshold: 8,
  community: mockCommunity,
  reviewTime: 9,
  metadata: mockMetadata,
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
  additionalInfo: {
    [TEAM_FORMATION]: {
      type: "teamFormation",
      text: "Form your team details here",
    },
    [GRADING_CRITERIA]: { type: "teamFormation", text: "Sample grading criteria text" },
  },
};
export const evaluation: Evaluation = {
  evaluator: mockUser,
  created_at: new Date("2022-05-01T12:00:00Z"),
  comment: "comment",
  criteria: [],
  metadata: {
    language: "language",
  },
  points: 10,
  totalPoints: 1,
  reward: {
    amount: 10,
    token: "token",
  },
};

export const submission: Submission = {
  length: 0,
  id: "submission_id",
  ref: "reference",
  created_at: new Date("2022-05-01T12:00:00Z"),
  updated_at: new Date("2022-05-01T12:00:00Z"),
  link: "/submissions/reference",
  community: mockCommunity,
  user_id: "user_id",
  challenge: challenge,
  text: "Submission",
  reviewDeadline: new Date(),
  metadata: {
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
    feedbacks: 3,
    language: "",
    evaluation: {
      points: 8,
      reward: reward,
      score: 80,
      totalPoints: 10,
    },
  },
  evaluation: evaluation,
  timestamp: 0,
  user: mockUser,
  reviewable: false,
  status: "",
  reward: reward,
  map: () => {
    throw new Error("Function not implemented.");
  },
};

export const mockInvite = {
  created_at: new Date().toISOString(),
  id: "invite",
  ref: "invitation ref",
  status: "invitation status",
  team_ref: "team reference",
  timestamp: 3,
  updated_at: new Date().toISOString(),
  user: mockUser,
  user_id: "user id",
};

export const mockTeamMember: TeamMember = {
  created_at: new Date().toISOString(),
  id: "id",
  joined_on: "joined_on",
  ref: "ref",
  team_ref: "team reference",
  timestamp: 3,
  updated_at: new Date().toISOString(),
  user: mockUser,
};

export const mockTeam: Team = {
  challenge: challenge,
  challenge_ref: "challenge ref",
  created_at: new Date().toISOString(),
  id: "id",
  locked: true,
  name: "Master",
  organizer: mockUser,
  organizer_id: "organizer id",
  invites: [mockInvite],
  members: [mockTeamMember],
  ref: "",
  timestamp: "",
  updated_at: new Date().toISOString(),
};

export const mockFeedback: Feedback = {
  submission: submission,
  id: "234-4231243",
  ref: "feedbacks/234-4231243",
  created_at: new Date(),
  updated_at: "",
  criteria: ["criteria 1", "criteria 2"],
  positive: false,
  name: "The person who made a submission",
  challenge: "challenge name",
  timestamp: undefined,
  user: mockUser,
  ranking: 0,
  text: "I am providing a feedback",
};

export const challengeSliceData = {
  current: challenge,
  list: [challenge],
  submission: submission,
  loading: false

}
