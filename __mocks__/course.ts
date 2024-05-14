import { Course, LearningModule} from "@/types/course";


enum MaterialType {
  ADDITIONAL = "ADDITIONAL",
  MARKDOWN = "MARKDOWN",
  TEXT = "TEXT",
  ARTICLE = "ARTICLE",
  "EMBEDDED-VIDEO" = "EMBEDDED-VIDEO",
}

const mockCourse: Course = {
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
  introduction:  {
    text: "course intro",
  },
  active: true,
  certificateIcon: "certificate",
  certificateData: {
    narrative: "course certificate",
    icon: "certificate icon",
  },
  timestamp: 0,
  learningModules: [ {
    id: "learningModule id",
    ref: "learning module reference",
    created_at: new Date("2022-05-01T12:00:00Z"),
    updated_at: new Date("2022-05-01T12:00:00Z"),
    duration: 4,
    description: "learning module description",
    objectives: ["objective 1, objective 2"],
    title: "learning module title",
    community: "learning module community",
    materials: [{
      duration: 3,
      subtitle: "material subtitle",
      link: "material link",
      description: "material description",
      title: "material title",
      type: MaterialType.ADDITIONAL,
      list: [{ link: "Link 1" }],
    }],
    timestamp: 3,
    order: 4,
    course: "Learning module course",
    interactiveModules: [{
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
    }],
  }],
  trailer: {
    summary: "trailer summary",
    description: "trailer descriptio",
    video: "trailer video",
    duration: 4,
    info: {
      items: ["item 1", "item 2"],
      title: "info title",
    },
  },
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

const Rubric = {
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

const mockRatingCriteria = {
  name: "rating criteria",
  order: 4,
  rubric: [Rubric],
  maxPoints: 78,
};

const mockLearningModule: LearningModule = {
  id: "learningModule id",
  ref: "learning module reference",
  created_at: new Date("2022-05-01T12:00:00Z"),
  updated_at: new Date("2022-05-01T12:00:00Z"),
  duration: 4,
  description: "learning module description",
  objectives: ["objective 1, objective 2"],
  title: "learning module title",
  community: "learning module community",
  materials: [{
    duration: 3,
    subtitle: "material subtitle",
    link: "material link",
    description: "material description",
    title: "material title",
    type: MaterialType.ADDITIONAL,
    list: [{ link: "Link 1" }],
  }],
  timestamp: 3,
  order: 4,
  course: "Learning module course",
  interactiveModules: [{
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
  }],
};

export {Rubric, mockRatingCriteria, mockLearningModule, mockCourse}