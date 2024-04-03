
import {  mockSubmissionMetadata} from "./bounty";
import { colors } from "./colors";
import { reward } from "./reward";
import { userProfile } from "./userProfile";

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

 const mockCommunity = {
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
  reward: reward,
  courses: 3,
  duration: 4,
  items: [],
  challenge: { id: "1", name: "Challenge Name" },
  submission: mockSubmissionMetadata,
  can_mint_certificates: true,
};


 const mockReferral = {
  id: "1",
  name: "name",
  ref: "ref",
  created_at: new Date("2022-05-01T12:00:00Z"),
  updated_at: new Date("2022-05-01T12:00:00Z"),
  title: "title",
  community: mockCommunity,
  timestamp: 56789,
  reward: reward,
  user: userProfile,
  challenge: {},
  submission: mockSubmissionMetadata,
  rewarded: true,
  metadata: {
    reward: reward,
  },
}

export {
  mockCommunity,
  mockReferral,
}