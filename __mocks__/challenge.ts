import { mockFormat, mockCertificateData, mockCourse, mockLearningModule, mockRatingCriteria } from "./course";
import { mockCommunity, metadata } from "./community";
import { reward } from "./reward";
import { KYCSTATUS } from "@/store/feature/kyc.slice";
import { Evaluation, Submission, User } from "@/types/bounty";
import { AdditionalInfo, Challenge } from "@/types/course";
import { TEAM_FORMATION } from "@/constants/challengeInfo";
import { Team, TeamMember } from "@/types/challenge";

export const mockUser = (): User => ({
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
});

export const mockAdditionalInfo: {[type: string]: AdditionalInfo } = {
  "type": {type: "additional type", text: "additional text"},
}

export const challenge = (): Challenge => ({
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
  additionalInfo: {
    [TEAM_FORMATION]: {
      type: 'teamFormation',
      text: 'Form your team details here'
    }
  }
});

export const evaluation = (): Evaluation =>({
evaluator: mockUser(),
  created_at:new Date("2022-05-01T12:00:00Z"),
  comment: "comment",
  criteria: [],
  metadata: {
    language:"language"
  },
  points:10,
  totalPoints:1,
  reward: {
    amount: 10,
    token: "token"
  }
});

export const submission = (): Submission => ({
  length: 0,
  id: "submission_id",
  ref: "reference",
  created_at: new Date("2022-05-01T12:00:00Z"),
  updated_at: new Date("2022-05-01T12:00:00Z"),
  link: "/submissions/reference",
  community: mockCommunity,
  user_id: "user_id",
  challenge: challenge(),
  text: "Submission",
  reviewDeadline: new Date(),
  metadata: {
    evaluation: {
      points:8,
      reward:{},
      score:80,
      totalPoints:0,
    },
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
  evaluation:evaluation(),
  timestamp: 0,
  user: mockUser(),
  reviewable: false,
  status: "",
  reward: reward,
  map: function () {
    throw new Error("Function not implemented.");
  },
});

export const mockInvite = {
  created_at: "tuesday",
  id: "invite",
  ref: "invitation ref",
  status: "invitation status",
  team_ref: "team reference",
  timestamp: 3,
  updated_at: "wednesday",
  user: mockUser(),
  user_id: "user id",
}

export const mockTeamMember: TeamMember = {
  created_at: "created_at",
  id: "id",
  joined_on: "joined_on",
  ref: "ref",
  team_ref: "team reference",
  timestamp: 3,
  updated_at: "wednesday",
  user: mockUser(),
}

export const mockTeam: Team = {
  challenge: challenge(),
  challenge_ref: "challenge ref",
  created_at: "created at",
  id: "id",
  locked: true,
  name: "Master",
  organizer: mockUser(),
  organizer_id: "organizer id",
  invites: [mockInvite],
  members: [mockTeamMember],
  ref: "",
  timestamp: "",
  updated_at: ""
}