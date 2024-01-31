export const colors = {
  textAccent: "--tm-text",
  text: "--tm-text",
  accent: "--tm-accent",
  primary: "--tm-primary",
  secondary: "--tm-secondary",
  highlight: "--tm-highlight",
  muted: "--tm-muted",
  cover: {
    text: "--tm-text",
    accent: "--tm-accent",
    primary: "--tm-primary",
    background: "--tm-background",
  },
};
const metadata = {
  invite_id: "abc123",
  submissions: 5,
  bestSubmissions: ["submission1", "submission2"],
  feedbacks: 10,
  name: "Project XYZ",
  issuedOn: "2024-01-29T12:00:00Z",
  image: "image_url",
  title: "Title of the project",
  description: "Description of the project",
  narrative: "Narrative of the project",
  recipientName: "John Doe",
  issuerName: "Jane Smith",
  comment: "This is a comment",
  linkToWork: "link_to_work",
  submission: "submission_details",
};

const reward = {
  id: "123456789",
  ref: "ref123",
  created_at: new Date("2024-01-29T08:00:00Z"),
  updated_at: new Date("2024-01-29T08:30:00Z"),
  challenge: "Challenge Name",
  type: "Type of Reward",
  community: "Community Name",
  token: "Token ID",
  stable: true,
  amount: 100,
  timestamp: 1643424000,
};
// Mock Format object
const mockFormat = {
  githubLink: true,
  text: false,
  disclaimer: true,
};

const mockIntroduction = {
  text: "Welcome to our course! This is the introduction.",
};

const mockCertificateData = {
  narrative: "Congratulations! You have completed the course.",
  icon: "certificate_icon_url",
};

const mockTrailer = {
  summary: "Course Trailer Summary",
  description: "Course Trailer Description",
  video: "trailer_video_url",
  duration: 120,
  info: {
    items: ["Info Item 1", "Info Item 2"],
    title: "Trailer Info Title",
  },
};

// Mock InteractiveModule object
const mockInteractiveModule = {
  ref: "module123",
  title: "Interactive Module Title",
  text: "Interactive Module Text",
  closing: {
    text: "Closing Text",
    title: "Closing Title",
  },
  items: [
    {
      text: "Item Text",
      title: "Item Title",
      options: [
        {
          text: "Option A",
          isCorrect: true,
        },
        {
          text: "Option B",
          isCorrect: false,
        },
      ],
      question: {
        title: "Question Title",
        answers: ["Answer A", "Answer B", "Answer C"],
        correct: 0,
      },
    },
  ],
};

const MaterialType = {
  ADDITIONAL: "ADDITIONAL",
  MARKDOWN: "MARKDOWN",
  TEXT: "TEXT",
  ARTICLE: "ARTICLE",
  "EMBEDDED-VIDEO": "EMBEDDED-VIDEO",
};

// Mock Material object
const mockMaterial = {
  duration: 60,
  subtitle: "Material Subtitle",
  link: "https://example.com",
  description: "Material Description",
  title: "Material Title",
  type: MaterialType.ARTICLE,
  list: [
    {
      link: "https://example.com/resource1",
    },
    {
      link: "https://example.com/resource2",
    },
  ],
};

// Mock LearningModule object
const mockLearningModule = {
  id: "123456",
  ref: "module123",
  created_at: new Date(),
  updated_at: new Date(),
  duration: 120,
  description: "Learning Module Description",
  objectives: ["Objective 1", "Objective 2"],
  title: "Learning Module Title",
  community: "Community Name",
  materials: [mockMaterial],
  timestamp: Date.now(),
  order: 1,
  course: "Course Name",
  interactiveModules: [mockInteractiveModule],
};

const mockCourse = {
  id: "123",
  ref: "course123",
  created_at: new Date(),
  updated_at: new Date(),
  duration: 180,
  summary: "Course Summary",
  level: 1,
  name: "Introduction to TypeScript",
  description: "This course provides an introduction to TypeScript programming language.",
  objectives: ["Understand the basics of TypeScript", "Write TypeScript code confidently"],
  locale: "en",
  community: "Programming Community",
  slug: "typescript-intro",
  introduction: mockIntroduction,
  active: true,
  certificateIcon: "certificate_icon_url",
  certificateData: mockCertificateData,
  timestamp: Date.now(),
  learningModules: [mockLearningModule],
  trailer: mockTrailer,
  disclaimer: "Disclaimer Text",
  faq: [
    {
      description: "FAQ Description",
      title: "FAQ Title",
    },
  ],
  prerequisite: {
    items: ["Basic understanding of programming"],
    hint: "Completion of basic programming course is recommended.",
  },
  translations: ["one", "two"],
  // challenge: Challenge
  // challenges: Challenge[]
};

const mockChallenge = {
  id: "123",
  ref: "challenge123",
  created_at: new Date(),
  updated_at: new Date(),
  hint: "Challenge Hint",
  name: "Mock Challenge",
  format: mockFormat,
  description: "Description of the challenge",
  course: mockCourse,
  type: "Challenge Type",
  isTeamChallenge: false,
  objectives: ["Objective 1", "Objective 2"],
  threshold: 80,
  community: {
    id: "community123",
    name: "Community Name",
    description: "Community Description",
  },
  reviewTime: 7,
  metadata: {
    invite_id: "abc123",
    submissions: 5,
    bestSubmissions: ["submission1", "submission2"],
    feedbacks: 10,
    name: "Project XYZ",
    issuedOn: "2024-01-29",
    image: "image_url",
    title: "Title of the project",
    description: "Description of the project",
    narrative: "Narrative of the project",
    recipientName: "John Doe",
    issuerName: "Jane Smith",
    comment: "This is a comment",
    linkToWork: "link_to_work",
    submission: "submission_details",
    team: {
      members: ["Alice", "Bob", "Charlie"],
      leader: "Alice",
    },
  },
  level: 1,
  courses: [mockCourse],
  learningModules: [mockLearningModule],
  expiresAt: "2024-12-31",
  reward: {
    id: "reward123",
    ref: "reward123",
    created_at: new Date(),
    updated_at: new Date(),
    challenge: "",
    type: "Type of Reward",
    community: "Community Name",
    token: "Token ID",
    stable: true,
    amount: 100,
    timestamp: 1643424000,
  },
  certificateIcon: "certificate_icon_url",
  certificateData: {
    narrative: "Congratulations! You have completed the challenge.",
    icon: "certificate_icon_url",
  },
  ratingCriteria: [
    {
      criteria: "Criteria 1",
      description: "Description of Criteria 1",
      maxPoints: 5,
    },
  ],
  timestamp: Date.now(),
  maxPoints: 100,
  minPoints: 60,
  rewards: [],
  feedbacks: {
    id: "feedback123",
    ref: "feedback123",
    created_at: new Date(),
    updated_at: new Date(),
    feedback: "Feedback Text",
    rating: 4,
    reviewer: "Reviewer Name",
    reviewedOn: new Date(),
  },
  bestSubmissions: [],
  teamLimit: 3,
  isHackathon: false,
};

export const community = {
  id: "ew-43",
  ref: "community/ref",
  created_at: new Date("2022-05-01T12:00:00Z"),
  updated_at: new Date("2022-05-01T12:00:00Z"),
  summary: "this is tehe summary",
  icon: "public/img/communities/aeternity.svg",
  name: "aeternity",
  image: "public/img/communities/aeternity.svg",
  colors: colors,
  slug: "ae",
  active: true,
  description: "this is a aeternity community",
  metadata,
  timestamp: 182044800000,
  rewards: [reward],
  reward,
  courses: 3,
  duration: 4,
  challenge: mockChallenge,
  submission: { id: "32" },
  can_mint_certificates: true,
};
