import { reward } from "./reward";

export type Course = {
    id: "course",
    ref: "course ref",
    created_at: "created_at",
    updated_at: "updated_at",
    duration: 3,
    summary: "Course description",
    level: 3,
    name: "course name",
    description: "Course description",
    objectives: ["course description", "course objectives"],
    locale: "English",
    community: "community",
    slug: "course description slug",
    introduction: object,
    active: true,
    certificateIcon: "certificate",
    certificateData: object,
    timestamp: 0,
    learningModules: [object],
    translations: [],
    trailer: object,
    disclaimer: "Course",
    items?: ["item 1", "item 2"],
    faq: [{
      description: "faq description"
      title: "faq title"
    }],
    prerequisite: {
      items: ["item 1", "item 2"],
      hint: "prerequisite hint"
    };
  };

export const Format = {
    githubLink: true,
    text: true,
    disclaimer: true,
  };

export const challenge = {
  id: "challenge",
  ref: "challenge ref",
  created_at: new Date("2022-05-01T12:00:00Z"),
  updated_at: new Date("2022-05-01T12:00:00Z"),
  hint: "Hint",
  name: "challenge name",
  format: Format,
  description: "challenge description",
  course: {},
  type: "course",
  isTeamChallenge: false,
  objectives: ["challenge objectives"],
  threshold: 8,
  community: {},
  reviewTime: 9,
  metadata: {},
  level: 58,
  courses: [{}],
  learningModules: [{}],
  expiresAt: "2025",
  reward: reward,
  certificateIcon: "certificate",
  certificateData: {},
  ratingCriteria: [{}],
  timestamp: 6,
  maxPoints: 299,
  minPoints: 9,
  rewards: [reward],
  feedbacks: {},
  feedbackInfo: [{}],
  bestSubmissions: [{}],
  teamLimit: 5,
  isHackathon: false
}