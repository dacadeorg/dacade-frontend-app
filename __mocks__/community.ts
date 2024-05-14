import { Community } from "@/types/community";
import { colors } from "./colors";
import { mockCourse, mockLearningModule, mockRatingCriteria } from "./course";
import { reward } from "./reward";
import { mockMetadata } from "./metaData";

const mockCommunity: Community = {
  id: "ew-43",
  ref: "community/ref",
  created_at: new Date("2022-05-01T12:00:00Z"),
  updated_at: new Date("2022-05-01T12:00:00Z"),
  summary: "this is the summary",
  icon: "public/img/communities/aeternity.svg",
  name: "aeternity",
  image: "public/img/communities/aeternity.svg",
  colors: colors,
  slug: "ae",
  active: true,
  description: "this is a aeternity community",
  metadata: mockMetadata,
  timestamp: 182044800000,
  rewards: [reward],
  reward,
  courses: 3,
  duration: 4,
  can_mint_certificates: true,
  challenge: {
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
  },
  challenges: 4
};

export {mockCommunity}