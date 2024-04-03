import { mockSubmission, mockTrailer } from "./bounty";
import { mockRatingCriteria } from "./challenge";
import { mockCommunity } from "./community";
import { reward } from "./reward";

export const CertificateData = {
    narrative: "narrative",
    icon: "icon",
  };

  export const mockFormat = {
    githubLink: true,
    text: true,
    disclaimer: true,
  };

  export const mockMetadata = {
    submissions: 93,
    bestSubmissions: ["best_submission"],
    feedbacks: 93,
    name: "feedback",
    issuedOn: "issued",
    image: "image",
    title: "title",
    description: "description",
    narrative: "narrative",
    recipientName: "recipient_name",
    issuerName: "issuer_name",
    comment: "comment",
    linkToWork: "link_to_work",
  };

  export const mockDistribution = {
    first: "first",
    second: "second",
    third: "third",
  };
  
  export const mockIntroduction = {
    text: "text",
  };

  export const mockInteractiveModule = {
    ref: "reference",
    title: "title",
    text: "text",
    closing: {
      text: "text",
      title: "title",
    },
    items: [{
      text: "text",
      title: "title",
      options: {
        text: "text",
        isCorrect: true
      },
      question: {
        title: "title",
        answers: ["text", "title"],
        correct: 789,
      },
    }]
  };

  enum MaterialType {
    ADDITIONAL = "ADDITIONAL",
    MARKDOWN = "MARKDOWN",
    TEXT = "TEXT",
    ARTICLE = "ARTICLE",
    "EMBEDDED-VIDEO" = "EMBEDDED-VIDEO",
  }
  
  export const mockMaterial = {
    duration: 82,
    link: "/dummy",
    title: "Material",
    type: MaterialType,
    list: [{link: "/dummy"}]
  };

  export const mockLearningModule = {
    id: "learning_module",
    ref: "reference",
    created_at: new Date("2022-05-01T12:00:00Z"),
    updated_at: new Date("2022-05-01T12:00:00Z"),
    duration: 8,
    description: "description",
    objectives: ["description"],
    title: "title",
    community: "community",
    materials: [mockMaterial],
    timestamp: 67,
    order: 78,
    course: "course",
    interactiveModules: [mockInteractiveModule],
  };

  export const mockCourse = {
    id: "id",
    ref: "reference",
    created_at: new Date("2022-05-01T12:00:00Z"),
    updated_at: new Date("2022-05-01T12:00:00Z"),
    duration: 6789,
    summary: "Course",
    level: 67,
    name: "Course",
    description: "Course description",
    objectives: ["course", "objective"],
    locale: "English",
    community: "community",
    slug: "course",
    introduction: mockIntroduction,
    active: true,
    certificateIcon: "icon",
    certificateData: CertificateData,
    timestamp: 678,
    learningModules: [mockLearningModule],
    translations: [],
    trailer: mockTrailer,
    disclaimer: "Disclaimer",
    faq: [{
      description: "Description",
      title: "Description title",
    }],
    prerequisite: {
      items: ["course", "item"],
      hint: "Hint",
    }
  };

  export const mockChallenge: any = {
    id: "id",
    ref: "reference",
    created_at: new Date("2022-05-01T12:00:00Z"),
    updated_at: new Date("2022-05-01T12:00:00Z"),
    hint: "hint",
    name: "name",
    format: mockFormat,
    description: "description",
    course: mockCourse,
    type: "course",
    isTeamChallenge: false,
    objectives: ["course", "objective"],
    threshold: 7,
    community: mockCommunity,
    reviewTime: 67,
    metadata: mockMetadata,
    level: 67,
    courses: [mockCourse],
    learningModules: [mockLearningModule],
    expiresAt: "expired",
    certificateIcon: "certificate",
    certificateData: CertificateData,
    ratingCriteria: [mockRatingCriteria],
    timestamp: 5678,
    maxPoints: 789,
    minPoints: 567,
    rewards: [reward],
    feedbacks: "",
    bestSubmissions: [mockSubmission],
  };

