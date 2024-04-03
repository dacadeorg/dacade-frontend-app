import React from "react";
import { mockCommunity } from "./community";

  
  const mockBountyCourse = {
    prerequisite: ["Prerequisite 1", "Prerequisite 2"],
    duration: 10,
    slug: "course-slug",
    active: true,
    trailer: {
      summary: "Trailer summary",
      duration: 120,
      info: { items: ["Item 1", "Item 2"], title: "Trailer info" },
    },
    metadata: { key: "value" },
    author: { name: "Author", description: "Course author description" },
    faq: [{ title: "FAQ Title", description: "FAQ Description" }],
    disclaimer: "Course disclaimer",
  };
  
  const mockColors = {
    primary: "red",
    secondary: "blue",
  };
  
  const mockTrailer = {
    summary: "Trailer summary",
    duration: 120,
    info: { items: ["Item 1", "Item 2"], title: "Trailer info" },
  };
  
  const mockCourseAuthor = {
    name: "Course author name",
    description: "Course author description",
  };
  
  const mockFaq = [{ title: "FAQ Title", description: "FAQ Description" }];
  
  const mockEvaluation = {
    evaluator: { name: "Evaluator" },
    created_at: "2023-11-01",
    comment: "Evaluation comment",
    criteria: [{ title: "Criteria Title", description: "Criteria Description" }],
    metadata: { language: "English" },
    points: 10,
    totalPoints: 100,
    reward: { amount: 50, token: "Token" },
  };
  
  const mockSubmissionMetadata = {
    evaluation: mockEvaluation,
    applicableReward: { ref: "RewardRef", amount: 50, token: "Token" },
    reviewed: true,
    feedbacks: 5,
    language: "English",
  };
  
  const mockApplicableReward = {
    ref: "RewardRef",
    amount: 50,
    updated_at: "2023-11-01",
    challenge: "Challenge123",
    created_at: "2023-11-01",
    id: "reward123",
    type: "Type",
    community: "Community",
    timestamp: Date.now(),
    token: "Token",
    stable: true,
  };
  
  const mockUser = {
    id: "user123",
    ref: "userRef",
    created_at: "2023-11-01",
    firstName: "John",
    displayName: "John Doe",
    uid: "uid123",
    joined: "2023-11-01",
    disabled: false,
    reputation: 100,
    username: "johndoe",
    lastName: "Doe",
    emailVerified: true,
    email: "john@example.com",
    avatar: "avatar.png",
    metadata: { reputation: 100 },
    discordConnected: true,
    isKycVerified: true,
    feedbacks: { feedback: "Feedback" },
    discord: { connected: true },
    kycStatus: "Verified",
    referrals: { referral: "Referral" },
  };
  
  const mockReputation = {
    id: "reputation123",
    total: 100,
    list: ["List 1", "List 2"],
    community: "Community",
    score: 100,
  };
  
  const mockBountyAuthor = {
    description: "Bounty author description",
    name: "Bounty author name",
  };
  
  const mockSubmission: any = {
    length: 1,
    map: () => React.createElement('div', null),
    id: "submission123",
    ref: "submissionRef",
    team_ref: "teamRef",
    created_at: new Date("2024-01-29T08:00:00Z"),
    updated_at: new Date("2024-01-29T08:00:00Z"),
    link: "https://example.com",
    community: mockCommunity,
    user_id: "user123",
    challenge: "challenge123",
    text: "Submission text",
    reviewDeadline: "2023-11-01",
    metadata: mockSubmissionMetadata,
    timestamp: Date.now(),
    user: mockUser,
    reviewable: true,
    status: "Status",
    evaluation: mockEvaluation,
    reward: { title: "Reward" },
    team: { name: "Team" },
  };

  const mockBounty = {
    url: "https://example.com",
    image: undefined,
    id: "bounty123",
    ref: "ref123",
    created_at: "2023-11-01",
    updated_at: "2023-11-07",
    icon: "icon.png",
    active: true,
    colors: { primary: "red", secondary: "blue" },
    description: "Bounty description",
    summary: "Bounty summary",
    name: "Bounty name",
    slug: "bounty-slug",
    metadata: { key: "value" },
    timestamp: Date.now(),
    course: mockBountyCourse,
    challenge: "challenge123",
    reward: { title: "Reward" },
    totalSubmissions: 10,
    submissions: mockSubmission,
    author: mockBountyAuthor,
    unreviewedSubmissionsCount: 5,
  };
  
  export {
    mockBounty,
    mockBountyCourse,
    mockBountyAuthor,
    mockSubmission,
    mockSubmissionMetadata,
    mockApplicableReward,
    mockUser,
    mockReputation,
    mockEvaluation,
    mockFaq,
    mockCourseAuthor,
    mockTrailer,
    mockColors,
  };
  
  