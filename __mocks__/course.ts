import { reward } from "./reward";

export const Course = {
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
    introduction: Object,
    active: true,
    certificateIcon: "certificate",
    certificateData: Object,
    timestamp: 0,
    learningModules: [Object],
    translations: [],
    trailer: Object,
    disclaimer: "Course",
    items: ["item 1", "item 2"],
    faq: [{
      description: "faq description",
      title: "faq title"
    }],
    prerequisite: {
      items: ["item 1", "item 2"],
      hint: "prerequisite hint"
    }
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
  objectives: ["objectives 1", "Objectives 2", "Objectives 3", "Objectives 4"],
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


export const Rubric = {
  id: "id",
  ref: "rubric references",
  created_at: "Wednesday",
  updated_at: "Thursday",
  challenge: "Challenge",
  text: "Challenge text",
  type: "challenge type",
  order: 89,
  points: 90,
  timestamp: 73,
  typeSlug: "slug"
};

export const RatingCriteria = {
  name: "rating criteria",
  order: 4,
  rubric: [Rubric],
  maxPoints: 78,
};