import { Community } from "@/types/community";
import { colors } from "./colors";

export const mockMetadata = {
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

const mockReward = {
  id: "123456789",
  ref: "ref123",
  created_at: new Date("2024-01-29T08:00:00Z"),
  updated_at: new Date("2024-01-29T08:30:00Z"),
  challenge: "Challenge Name",
  type: "SUBMISSION",
  community: "Community Name",
  token: "Token ID",
  stable: true,
  amount: 100,
  timestamp: 1643424000,
};

export const mockCommunity: Community = {
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
  rewards: [mockReward],
  reward: mockReward,
  courses: 3,
  duration: 4,
  can_mint_certificates: true,
  challenges: 3,
};
