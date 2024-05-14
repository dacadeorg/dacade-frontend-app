import { Challenge, Course, LearningModule, Material } from "@/types/course";
import { mockTrailer } from "./bounty";
import { reward } from "./reward";
import { community, metadata } from "./community";

export const Introduction = {
  text: "course intro",
};

export const mockCertificateData = {
  narrative: "course certificate",
  icon: "certificate icon",
};
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
  typeSlug: "slug",
};

export const mockRatingCriteria = {
  name: "rating criteria",
  order: 4,
  rubric: [Rubric],
  maxPoints: 78,
};

enum MaterialType {
  ADDITIONAL = "ADDITIONAL",
  MARKDOWN = "MARKDOWN",
  TEXT = "TEXT",
  ARTICLE = "ARTICLE",
  "EMBEDDED-VIDEO" = "EMBEDDED-VIDEO",
}
export const mockMaterial: Material = {
  duration: 3,
  subtitle: "material subtitle",
  link: "material link",
  description: "material description",
  title: "material title",
  type: MaterialType.ADDITIONAL,
  list: [{ link: "Link 1" }],
};

export const InteractiveModule = {
  ref: "interactive module ref",
  title: "interactive module title",
  text: "interative text",
  closing: {
    text: "closing",
    title: "title",
  },
  items: [
    {
      text: "text",
      title: "title",
      options: {
        text: "text",
        isCorrect: true,
      },
      question: {
        title: "question title",
        answers: ["answer 1", "answer 2"],
        correct: 2,
      },
    },
  ],
};

export const mockLearningModule: LearningModule = {
  id: "learningModule id",
  ref: "learning module reference",
  created_at: new Date("2022-05-01T12:00:00Z"),
  updated_at: new Date("2022-05-01T12:00:00Z"),
  duration: 4,
  description: "learning module description",
  objectives: ["objective 1, objective 2"],
  title: "learning module title",
  community: "learning module community",
  materials: [mockMaterial],
  timestamp: 3,
  order: 4,
  course: "Learning module course",
  interactiveModules: [InteractiveModule],
};

export const mockCourse: Course = {
  id: "course",
  ref: "course ref",
  created_at: new Date("2022-05-01T12:00:00Z"),
  updated_at: new Date("2022-05-01T12:00:00Z"),
  duration: 3,
  summary: "Course description",
  level: 3,
  name: "course name",
  description: "Course description",
  objectives: ["course description", "course objectives"],
  locale: "English",
  community: "community",
  slug: "course description slug",
  introduction: Introduction,
  active: true,
  certificateIcon: "certificate",
  certificateData: mockCertificateData,
  timestamp: 0,
  learningModules: [mockLearningModule],
  trailer: mockTrailer,
  disclaimer: "Course",
  items: ["item 1", "item 2"],
  faq: [
    {
      description: "faq description",
      title: "faq title",
    },
  ],
  prerequisite: {
    items: ["item 1", "item 2"],
    hint: "prerequisite hint",
  },
};

export const Format = {
  githubLink: true,
  text: true,
  disclaimer: true,
};

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
