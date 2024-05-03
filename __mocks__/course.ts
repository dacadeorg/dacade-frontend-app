import { community } from "./community";

  const metadata = {
    invite_id: '',
    submissions: 3,
    bestSubmissions: '',
    feedbacks: 3,
    name: '',
    issuedOn: '',
    image: '',
    title: '',
    description: '',
    narrative: '',
    recipientName: '',
    issuerName: '',
    comment: '',
    linkToWork: '',
    submission: '',
  };

const format = {
    githubLink: false,
    text: false,
    disclaimer: false,
  };
  
  const introduction = {
    text: 'Introduction about the course ...',
  };

  const certificateData = {
    narrative: 'string',
    icon: 'public/img/communities/aeternity.svg',
  };

  export const interactiveModule = {
    ref: 'string',
    title: 'string',
    text: 'string',
    closing: {
      text: 'string',
      title: 'string',
    },
    items: {
      text: 'string',
      title: 'string',
      options: {
        text: 'string',
        isCorrect: false,
      },
      question: {
        title: 'string',
        answers: 'string',
        correct: 3,
      },
    },
  };

  const materialType = {
    ADDITIONAL: "ADDITIONAL",
    MARKDOWN: "MARKDOWN",
    TEXT: "TEXT",
    ARTICLE: "ARTICLE",
    "EMBEDDED-VIDEO": "EMBEDDED-VIDEO",
  };

const material = {
    duration: 3,
    subtitle: 'string',
    link: 'string',
    description: 'string',
    title: 'string',
    type: materialType,
    list: { link: 'string'},
  };

  export const learningModule = {
    id: '123456789',
    ref: 'ref123',
    created_at: new Date('2024-01-29T08:00:00Z'),
    updated_at: new Date('2024-01-29T08:30:00Z'),
    duration: 3,
    description: 'string',
    objectives:  'string',
    title: 'Learning Module title',
    community:  'NEAR',
    materials: material,
    timestamp: 23,
    order: 2,
    course:  'string',
    interactiveModules: interactiveModule,
  };

  const trailer = {
    summary: 'string',
    description: 'string',
    video: 'string',
    duration: 2,
    info: {
      items: 'string',
      title: 'string',
    },
  };

 const distribution = {
  first: 1,
  second: 2,
  third: 3,
};

  const reward = {
    id: '123456789',
    ref: 'ref123',
    created_at: new Date('2024-01-29T08:00:00Z'),
    updated_at: new Date('2024-01-29T08:30:00Z'),
    challenge: 'string',
    type: 'string',
    community: 'string',
    token:'string',
    stable: false,
    fiatCurrency: 'string',
    amount: 3,
    timestamp: 3,
    distribution: distribution,
  };


  const rubric = {
   id: '123456789',
   ref: 'ref123',
   created_at: new Date('2024-01-29T08:00:00Z'),
  updated_at: new Date('2024-01-29T08:30:00Z'),
  challenge:  'string',
  text:  'string',
  type:  'string',
  order:  'string',
  points:  'string',
  timestamp:  'string',
  typeSlug:  'string',
};


  // export type Distribution = {
  //   first: 1;
  //   second: 2;
  //   third: 3;
  // };


  export const ratingCriteria = {
    name: 'string',
    order: 3,
    rubric: rubric,
    maxPoints: 3,
  };


export const course: any = {
  id: '123456789',
  ref: 'ref123',
  created_at: new Date("2024-01-29T08:00:00Z"),
  updated_at: new Date("2024-01-29T08:30:00Z"),
  duration: 3,
  summary: "this is about a course in order to learn something",
  level: 3,
  name: "course ABC",
  description: 'this is about a course in order to learn something',
  objectives: '',
  locale: 'locale here',
  community: "NEAR or could be another",
  slug: 'ae',
  introduction: introduction,
  active: false,
  certificateIcon: 'public/img/communities/aeternity.svg',
  certificateData: certificateData,
  timestamp: 3,
  learningModules: learningModule,
  // challenge: challenge,
  // challenges: challenge,
  translations: '',
  trailer: trailer,
  disclaimer: '',
  items: '',
  faq: {
    description: 'this course is about developing an application',
    title: 'TITLE',
  },
  prerequisite: {
    items: '',
    hint: '',
  },
};

export const challenge = {
  id: '123456789',
  ref: 'ref123',
  created_at: new Date("2024-01-29T08:00:00Z"),
  updated_at: new Date("2024-01-29T08:30:00Z"),
  hint: 'string',
  name: 'string',
  format: format,
  description: 'string',
  course: course,
  type: 'string',
  isTeamChallenge: false,
  objectives: '',
  threshold: 3,
  community: community,
  reviewTime: 3,
  metadata: metadata,
  level: 3,
  courses: course,
  learningModules: learningModule,
  expiresAt: 'string',
  reward: reward,
  certificateIcon: "string",
  certificateData: certificateData,
  ratingCriteria: ratingCriteria,
  timestamp: 2,
  maxPoints: 5,
  minPoints: 1,
  rewards: reward,
  // feedbacks: feedback,
  // feedbackInfo?: feedback,
  // bestSubmissions: submission,
  teamLimit: 4,
  isHackathon: false,
  multipleSubmissions: false,
};