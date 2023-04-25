export type RatingCriteria = {
  name: string;
  order: number;
  rubric: Rubric[];
  maxPoints: number;
};

export type Rebric = {
  id: string;
  ref: string;
  created_at: string;
  updated_at: string;
  type: string;
  points: number;
  challenge: string;
  text: string;
  timestamp: timestamp;
  typeSlug: string;
};
