// Those types are temporary
// TODO: Should be improved with the extact types

export type Course = {
  id: string;
  ref: string;
  created_at: Date;
  updated_at: Date;
  duration: number;
  summary: string;
  level: number;
  name: string;
  description: string;
  objectives: string[];
  locale: string;
  community: string;
  slug: string;
  introduction: Introduction;
  active: boolean;
  certificateIcon: string;
  certificateData: CertificateData;
  timestamp: number;
  learningModules: LearningModule[];
  challenge: Challenge;
  translations: any[];
  trailer: any;
  disclaimer: any;
  items?: any[];
  prerequisite: {
    items: any[];
    hint: string;
  };
};

export type CertificateData = {
  narrative: string;
  icon: string;
};

export type Challenge = {
  id: string;
  ref: string;
  created_at: Date;
  updated_at: Date;
  hint: string;
  format: Format;
  description: string;
  course: string;
  objectives: string[];
  threshold: number;
  community: string;
  reviewTime: number;
  metadata: Metadata;
  level: number;
  courses: string[];
  certificateIcon: string;
  certificateData: CertificateData;
  ratingCriteria: RatingCriteria[];
  timestamp: number;
  maxPoints: number;
  minPoints: number;
  rewards: Reward[];
};

export type RatingCriteria = {
  name: string;
  order: number;
  rubric: Rubric[];
  maxPoints: number;
  [key: string]: any;
};

export type Rubic = {
  id: string;
  ref: string;
  created_at: string;
  updated_at: string;
  challenge: string;
  text: string;
  type: string;
  order: number;
  points: number;
  timestamp: number;
  typeSlug: string;
  [key: string]: any;
};

export type Format = {
  githubLink: boolean;
  text: boolean;
  disclaimer: boolean;
};

export type Metadata = {
  submissions: number;
  bestSubmissions: string[];
  feedbacks: number;
};

export type Reward = {
  id: string;
  ref: string;
  created_at: Date;
  updated_at: Date;
  challenge: string;
  type: string;
  community: string;
  token: string;
  stable: boolean;
  amount: number;
  timestamp: number;
};

export type Introduction = {
  text: string;
};

export type LearningModule = {
  id: string;
  ref: string;
  created_at: Date;
  updated_at: Date;
  duration: number;
  description: string;
  objectives: string[];
  title: string;
  community: string;
  materials: Material[];
  timestamp: number;
  order: number;
  course: string;
  interactiveModules: InteractiveModule[];
};

export type InteractiveModule = {
  ref: string;
  title: string;
  text: string;
  closing: {
    text: string;
    title: string;
  };
  items: {
    text: string;
    title: string;
    options: {
      text: string;
      isCorrect: boolean;
    };
    question: {
      title: string;
      answers: string[];
      correct: number;
    };
  }[];
};
